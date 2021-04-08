import { Request, Response, Router } from 'express';
import { Zone, inputZone, schema } from '../entity/Zone'
import Joi from 'joi';
const zoneRouter = Router();

zoneRouter.get('/', async (req, res) => {
  const zones = await Zone.find();
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  res.header('X-Total-Count', zones.length.toString());
  res.json(zones);
})

zoneRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await Zone.findOneOrFail({ id: Number.parseInt(id) },));
})

zoneRouter.post('/', async (req, res) => {
  const value: Object = await schema.validateAsync(req.body);
  res.json(await Zone.create(value).save());
})

zoneRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  // res.json(await Zone.update({ id: Number.parseInt(id) }, { ...req.body }));
  res.json(await Zone.save({ id: Number.parseInt(id), ...req.body }));
})

zoneRouter.delete('/:id', async (req, res) => {
  res.json(await Zone.delete({ id: Number.parseInt(req.params.id) }));
});

export { zoneRouter };