import { Request, Router } from 'express';
import { BaseEntity, getConnection, getRepository, SelectQueryBuilder } from 'typeorm';
import { Artefact } from '../entity/Artefact';
import { createSchema, editSchema, Zone } from '../entity/Zone';
import { HTTPException } from '../Errors';
import { createListQuery, IDLookup, idParams } from '../helperFunctions'
const zoneRouter = Router();


zoneRouter.get('/', async (req, res) => {
  const query = Zone.getRepository().createQueryBuilder('E');
  const zoneProps = getConnection().getMetadata(Zone).ownColumns.map(column => column.propertyName);
  createListQuery<Zone>(query, req, zoneProps);

  const zones = await query.getMany();
  // const zones = await Zone.find();
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  res.header('X-Total-Count', zones.length.toString());
  res.json(zones);
})

zoneRouter.get('/app', async (req, res) => {
  const zones = await Zone.getRepository()
    .createQueryBuilder("z")
    .leftJoinAndSelect("z.Artefacts", "a")
    .orderBy({ "a.priority": "DESC" })
    .getMany();
  // Non destructive map mutating list of zones
  zones.forEach(zone => zone.Artefacts = zone.Artefacts.map(x => x.id) as any);

  res.json(zones);
})

zoneRouter.get('/:id', async (req, res) => {
  // let zone: any | Zone = await Zone.findOneOrFail({ id: Number.parseInt(id) },);
  // const artefacts = (await getRepository(Artefact)
  //   .createQueryBuilder("a")
  //   .select("a.id")
  //   .leftJoin(Zone, "z", "z.id = a.zoneId")
  //   .where("z.id = :id", { id })
  //   .getMany()).map(x => x.id)
  const { id } = req.params;
  console.log("reading in parameter get")
  res.json(await Zone.findOneOrFail({ id: Number.parseInt(id) },));
})

zoneRouter.post('/', async (req, res) => {
  const value: Object = await createSchema.validateAsync(req.body);
  console.log(req.body);
  res.json(await Zone.create(value).save());
});

zoneRouter.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const value = await editSchema.validateAsync(req.body); // .optional()
  // res.json(await Zone.update({ id: Number.parseInt(id) }, { ...req.body }));
  res.json(await Zone.save({ id, ...value }));
})

zoneRouter.post('/:id/reorder', async (req, res) => {
  const id = parseInt(req.params.id);
  const { ordering } = req.body;
  if (!ordering) throw new HTTPException(400, "Please include an ordering list for reordering artefacts");

  const artefacts = await Artefact.getRepository()
    .createQueryBuilder('a')
    .select(["a.id"])
    .where("a.zoneId = :id", { id })
    .getMany();
  console.log(artefacts);

  const orderingLookup: IDLookup = ordering.reduce((acc: IDLookup, val: number, index: number) => {
    acc.set(val, ordering.length - index);
    return acc;
  }, new Map<number, number>());

  // artefactindex = orderingLookup.get(a.id);
  // const artefactwewant = artefactList[artefactindex]

  for (const a of artefacts) {
    const priority = orderingLookup.get(a.id);
    if (priority != undefined) {
      await Artefact.update({ id: a.id }, { priority });
    }
  }

  res.json({ message: "Done successfully" });
})

// zoneRouter.get('/:id/artefacts', async (req, res) => {
//   const id = parseInt(req.params.id);
//   const artefacts = await Artefact.getRepository()
//     .createQueryBuilder('a')
//     .select(["a.id"])
//     .where("a.zoneId = :id", { id })
//     .getMany();
//   console.log(artefacts);
//   res.json(artefacts);

// })

zoneRouter.delete('/:id', async (req, res) => {
  let { id }: idParams = req.params;
  id = Number.parseInt(id);
  await Artefact.createQueryBuilder()
    .update()
    .set({ priority: -1 })
    .where("zoneId = :id", { id })
    .execute();

  res.json(await Zone.delete({ id: Number.parseInt(req.params.id) }));
});

export { zoneRouter };
