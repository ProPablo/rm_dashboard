import { Request, Response, Router } from 'express';
import { Zone, inputZone, createSchema, editSchema } from '../entity/Zone'
import Joi from 'joi';
import { getRepository } from 'typeorm';
import { Artefact } from '../entity/Artefact';
const zoneRouter = Router();

zoneRouter.get('/', async (req, res) => {
  const zones = await Zone.find();
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  res.header('X-Total-Count', zones.length.toString());
  res.json(zones);
})

zoneRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  let zone: any | Zone = await Zone.findOneOrFail({ id: Number.parseInt(id) },);
  const artefacts = (await getRepository(Artefact)
    .createQueryBuilder("a")
    .select("a.id")
    .leftJoin(Zone, "z", "z.id = a.zoneId")
    .where("z.id = :id", { id })
    .getMany()).map(x => x.id)
  zone.Artefacts = artefacts;
  res.json(zone);
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

zoneRouter.delete('/:id', async (req, res) => {
  res.json(await Zone.delete({ id: Number.parseInt(req.params.id) }));
});

export { zoneRouter };