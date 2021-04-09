import { Request, Response, Router } from 'express';
import { Beacon, inputBeacon, editSchema, createSchema } from '../entity/Beacon'
import Joi, { optional } from 'joi';
import { getConnection } from 'typeorm';

const beaconRouter = Router();
const beaconProps = [
  'id',
  'Name',
  'Visits',
  'MACAddress',
  'Activation',
  'CoordX',
  'CoordY',
  'zoneId'
];


beaconRouter.get('/', async (req, res) => {
  const query = Beacon.getRepository().createQueryBuilder('b');
  if (req.query._sort && typeof req.query._sort == 'string') query.orderBy(req.query._sort, req.query._order as any);

  // const beaconProps = getConnection().getMetadata(Beacon).ownColumns.map(column => column.propertyName);
  let listOfParams = Object.keys(req.query).filter(x => !x.startsWith('_'));
  if (listOfParams && listOfParams.every(x => beaconProps.includes(x))) {
    listOfParams.forEach(param => query.andWhere(`b.${param} = :pVal`, { pVal: req.query[param] }));
  }

  const beacons = await query.getMany();
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  res.header('X-Total-Count', beacons.length.toString());
  res.json(beacons);
})

beaconRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await Beacon.findOneOrFail({ id: Number.parseInt(id) },));
})

beaconRouter.post('/', async (req, res) => {
  const value: Object = await createSchema.validateAsync(req.body);
  res.json(await Beacon.create(value).save());
})

beaconRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  
  const value = await editSchema.validateAsync(req.body);
  // res.json(await Beacons.update({ id: Number.parseInt(id) }, { ...req.body }));
  res.json(await Beacon.save({ id: Number.parseInt(id), ...value }));
})

beaconRouter.delete('/:id', async (req, res) => {
  res.json(await Beacon.delete({ id: Number.parseInt(req.params.id) }));
});

export { beaconRouter };