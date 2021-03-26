import { Request, Response, Router } from 'express';
import { Source, inputSource } from '../entity/Source'
import Joi from 'joi';
const router = Router();


const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  clicks: Joi.number().integer().required()
})

router.get('/', async (req, res) => {
  const courses = await Source.find();
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  res.header('X-Total-Count', courses.length.toString());
  res.json(courses);
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await Source.findOneOrFail({ id: Number.parseInt(id) },));
})

router.post('/', async (req, res) => {
  const value: inputSource = await schema.validateAsync(req.body);
  console.log("resulting value", value);
  res.json(await Source.create(value).save());
})

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await Source.update({ id: Number.parseInt(id) }, { ...req.body }));
})

router.delete('/:id', async (req, res) => {
  res.json(await Source.delete({ id: Number.parseInt(req.params.id) }));
});

export default router;