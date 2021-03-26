import { Request, Response, Router } from 'express';
import { Beacon, inputBeacon, schema } from '../entity/Beacon'
import Joi, { optional } from 'joi';
const beaconRouter = Router();

beaconRouter.get('/', async (req, res) => {
  const beacons = await Beacon.find();
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  res.header('X-Total-Count', beacons.length.toString());
  res.json(beacons);
})

beaconRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await Beacon.findOneOrFail({ id: Number.parseInt(id) },));
})

beaconRouter.post('/', async (req, res) => {
  const value: Object = await schema.validateAsync(req.body);
  res.json(await Beacon.create(value).save());
})

beaconRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  // const value = schema.optional().validateAsync(req.body);
  // res.json(await Beacons.update({ id: Number.parseInt(id) }, { ...req.body }));
  res.json(await Beacon.save({ id: Number.parseInt(id), ...req.body } ));
})

beaconRouter.delete('/:id', async (req, res) => {
  res.json(await Beacon.delete({ id: Number.parseInt(req.params.id) }));
});

export { beaconRouter };