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
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  res.header('X-Total-Count', storeItems.length.toString());
  res.json(storeItems);
})

storeItemRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await StoreItem.findOneOrFail({ id: Number.parseInt(id) },));
})

storeItemRouter.post('/', async (req, res) => {
  const value: Object = await createSchema.validateAsync(req.body);
  res.json(await StoreItem.create(value).save());
})

storeItemRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  
  const value = await editSchema.validateAsync(req.body);
  res.json(await StoreItem.save({ id: Number.parseInt(id), ...value }));
})

storeItemRouter.delete('/:id', async (req, res) => {
  res.json(await StoreItem.delete({ id: Number.parseInt(req.params.id) }));
});

export { storeItemRouter };
