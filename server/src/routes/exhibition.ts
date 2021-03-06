import { Router } from 'express';
import { getConnection } from 'typeorm';
import { createSchema, editSchema, Exhibition } from '../entity/Exhibition';
import { createListQuery } from '../helperFunctions';

const exhibitionRouter = Router();

exhibitionRouter.get('/', async (req, res) => {
  const query = Exhibition.getRepository().createQueryBuilder('E');
  const exhibitionProps = getConnection().getMetadata(Exhibition).ownColumns.map(column => column.propertyName);
  createListQuery<Exhibition>(query, req, exhibitionProps);

  const exhibitions = await query.getMany();
  exhibitions.forEach(a => a.thumbnail = a.thumbnail?.toString() as any);
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  res.header('X-Total-Count', exhibitions.length.toString());
  res.json(exhibitions);
})

exhibitionRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const exhibition = await Exhibition.findOneOrFail({ id: Number.parseInt(id) },);
  exhibition.thumbnail = exhibition.thumbnail?.toString() as any;
  res.json(exhibition);
})

exhibitionRouter.post('/', async (req, res) => {
  const value: Object = await createSchema.validateAsync(req.body);
  res.json(await Exhibition.create(value).save());
})

exhibitionRouter.put('/:id', async (req, res) => {
  const { id } = req.params;

  const value = await editSchema.validateAsync(req.body);

  const returnObj = await Exhibition.save({ id: Number.parseInt(id), ...value })
  returnObj.thumbnail = returnObj.thumbnail?.toString();
  res.json(returnObj);
})

exhibitionRouter.delete('/:id', async (req, res) => {
  res.json(await Exhibition.delete({ id: Number.parseInt(req.params.id) }));
});

export { exhibitionRouter };
