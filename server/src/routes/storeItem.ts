import { Router } from 'express';
import { getConnection } from 'typeorm';
import { createSchema, editSchema, StoreItem } from '../entity/StoreItem';
import { createListQuery } from '../helperFunctions';

const storeItemRouter = Router();

storeItemRouter.get('/', async (req, res) => {
  const query = StoreItem.getRepository().createQueryBuilder('E');
  const storeItemProps = getConnection().getMetadata(StoreItem).ownColumns.map(column => column.propertyName);
  createListQuery<StoreItem>(query, req, storeItemProps);

  const storeItems = await query.getMany();
  storeItems.forEach(a => a.thumbnail = a.thumbnail?.toString() as any);
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  res.header('X-Total-Count', storeItems.length.toString());
  res.json(storeItems);
})

storeItemRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const storeItem = await StoreItem.findOneOrFail({ id: Number.parseInt(id) },);
  storeItem.thumbnail = storeItem.thumbnail?.toString() as any;
  res.json(storeItem);
})

storeItemRouter.post('/', async (req, res) => {
  const value: Object = await createSchema.validateAsync(req.body);
  res.json(await StoreItem.create(value).save());
})

storeItemRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  
  const value = await editSchema.validateAsync(req.body);
  const returnObj = await StoreItem.save({ id: Number.parseInt(id), ...value })
  returnObj.thumbnail = returnObj.thumbnail?.toString();
  res.json(returnObj);
})

storeItemRouter.delete('/:id', async (req, res) => {
  res.json(await StoreItem.delete({ id: Number.parseInt(req.params.id) }));
});

export { storeItemRouter };
