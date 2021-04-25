import { Request, Router } from 'express';
import { BaseEntity, getConnection, SelectQueryBuilder } from 'typeorm';
import { Artefact } from '../entity/Artefact';
import { createSchema, editSchema, Zone } from '../entity/Zone';
import { HTTPException } from '../Errors';
import { createListQuery, IDLookup } from '../helperFunctions'
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
})

zoneRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const value = await editSchema.validateAsync(req.body); // .optional()
  // res.json(await Zone.update({ id: Number.parseInt(id) }, { ...req.body }));
  res.json(await Zone.save({ id: Number.parseInt(id), ...value }));
})

zoneRouter.post('/:id/reorder', async (req, res) => {
  let { id }: any = req.params;
  id = parseInt(id);
  const { ordering } = req.body;
  if (!ordering) throw new HTTPException(400, "Please include an ordering list for reordering artefacts");

  let increment = 0;
  const orderingLookup: IDLookup = ordering.reduce((acc: IDLookup, val: number) => {
    acc.set(val, increment++);
  }, new Map<number, number>());

  const artefacts = await Artefact.getRepository()
    .createQueryBuilder('a')
    .select("id")
    .where("zoneId = :id", { id })
    .getMany();
  console.log(artefacts);

  artefacts.forEach(a => {
    const Priority = orderingLookup.get(a.id);
    if (Priority) {
      Artefact.update({ id: a.id }, { Priority })
    }
  })
})

zoneRouter.delete('/:id', async (req, res) => {
  res.json(await Zone.delete({ id: Number.parseInt(req.params.id) }));
});

export { zoneRouter };
