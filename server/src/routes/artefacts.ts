import { Router } from 'express';
import { getConnection } from 'typeorm';
import { Artefact, createSchema, editSchema } from '../entity/Artefact';
// No autocomplete from path syntax
// import {} from '@entity/Artefact';
import { ArtefactMedia } from '../entity/ArtefactMedia';
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
  query.leftJoinAndSelect("E.Media", "m");

  const artefacts = await query.getMany();
  artefacts.forEach(a => {
    a.thumbnail = a.thumbnail?.toString() as any;
    if (a.Media) a.Media = { src: a.Media.src, type: a.Media.type } as ArtefactMedia;
  })
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  res.header('X-Total-Count', artefacts.length.toString());
  res.json(artefacts);
})

artefactRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const artefact = await Artefact.getRepository().createQueryBuilder('a')
    .leftJoinAndSelect("a.Media", "m")
    .where("a.id = :id", { id: parseInt(id) })
    .getOneOrFail();
  // const artefact = await Artefact.findOneOrFail({ id: Number.parseInt(id) },);

  // const artefactMedia = await ArtefactMedia.getRepository().createQueryBuilder('am')
  //   .where({ artefactId: id })
  //   .getOne();

  // Change Buffer to base64 string
  artefact.thumbnail = artefact.thumbnail?.toString() as any;
  if (artefact.Media) artefact.Media = { src: artefact.Media.src, type: artefact.Media.type } as ArtefactMedia;
  res.json(artefact);
})

artefactRouter.post('/', async (req, res) => {
  const value: Object = await createSchema.validateAsync(req.body);
  // React admin doesnt really use this value
  res.json(await Artefact.create(value).save());
})

artefactRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const value = await editSchema.validateAsync(req.body); // .optional()
  // res.json(await Artefact.update({ id: Number.parseInt(id) }, { ...req.body }));
  // req.body.thumbnail = Buffer.from(req.body.thumbnail) //THis is what breaks RA when the JOI object is sent back
  const returnObj = await Artefact.save({ id: Number.parseInt(id), ...value })
  returnObj.thumbnail = returnObj.thumbnail?.toString(); 
  res.json(returnObj);
})

artefactRouter.delete('/:id', async (req, res) => {
  res.json(await Artefact.delete({ id: Number.parseInt(req.params.id) }));
});

export { artefactRouter };
