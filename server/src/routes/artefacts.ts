import { Router } from 'express';
import { getConnection } from 'typeorm';
import { Artefact, createSchema, editSchema } from '../entity/Artefact';
import { HTTPException } from '../Errors';
import { createListQuery } from '../helperFunctions'
const artefactRouter = Router();
// const artefactprops = [
//   'id',
//   'Name',
//   'Description',
//   'Image',
//   'AcquisitionDate',
//   'CoordX',
//   'CoordY',
//   'zoneId'
// ];

artefactRouter.get('/', async (req, res) => {
  // const query = Artefact.getRepository().createQueryBuilder('a');
  // if (req.query._sort && typeof req.query._sort == 'string') query.orderBy(req.query._sort, req.query._order as any);

  // const artefactProps = getConnection().getMetadata(Artefact).ownColumns.map(column => column.propertyName);
  // let listOfParams = Object.keys(req.query).filter(x => !x.startsWith('_'));
  // if (listOfParams && listOfParams.every(x => artefactProps.includes(x))) {
  //   listOfParams.forEach(param => query.andWhere(`a.${param} = :pVal`, { pVal: req.query[param] }));
  // }
  // else {
  //   throw new HTTPException(400, "Query parameters invalid");
  // }

  const query = Artefact.getRepository().createQueryBuilder('E');
  // NOTE: inefficient retrieval of properties on entity
  const artefactProps = getConnection().getMetadata(Artefact).ownColumns.map(column => column.propertyName);
  createListQuery<Artefact>(query, req, artefactProps);

  const artefacts = await query.getMany();
  // Change Buffer to base64 string
  artefacts.forEach(a => a.Image = a.Image?.toString() as any);
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  res.header('X-Total-Count', artefacts.length.toString());
  res.json(artefacts);
})

artefactRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const artefact = await Artefact.findOneOrFail({ id: Number.parseInt(id) });
  // Change Buffer to base64 string
  artefact.Image = artefact.Image?.toString() as any;
  res.json(artefact);
})

artefactRouter.post('/', async (req, res) => {
  console.log("logging new artefact", req.body);
  const value: Object = await createSchema.validateAsync(req.body);
  res.json(await Artefact.create(value).save());
})

artefactRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const value = await editSchema.validateAsync(req.body); // .optional()
  // res.json(await Artefact.update({ id: Number.parseInt(id) }, { ...req.body }));
  res.json(await Artefact.save({ id: Number.parseInt(id), ...req.body }));
})

artefactRouter.delete('/:id', async (req, res) => {
  res.json(await Artefact.delete({ id: Number.parseInt(req.params.id) }));
});

export { artefactRouter };
