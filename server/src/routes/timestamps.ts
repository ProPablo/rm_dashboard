import { Request, Response, Router } from 'express';
import { Timestamp } from '../entity/Timestamp';
import { HTTPException } from '../Errors';
const router = Router();

interface InputTimstamp {
  studentId: number
}

router.get('/', async (req: Request, res: Response) => {
  res.json(await Timestamp.find());
});

router.post('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await Timestamp.create({ studentId: Number.parseInt(id) }).save();
  res.json('done');
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  //Relations do joins automatically
  res.json(await Timestamp.findOneOrFail({ id: Number.parseInt(id) }));
})

router.post('/', async (req, res) => {
  if (!Number.parseInt(req.body.studentId)) throw new HTTPException(400, "Not valid id");
  res.json(await Timestamp.create(req.body as InputTimstamp).save());
})

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await Timestamp.update({ id: Number.parseInt(id) }, { ...req.body }));
})

router.delete('/:id', (req, res) => {
  Timestamp.delete({ id: Number.parseInt(req.params.id) });
  res.json('done');
});

export default router;