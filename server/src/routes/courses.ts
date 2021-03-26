import { Request, Response, Router } from 'express';
import { Course, inputCourse } from '../entity/Course'
import Joi from 'joi';
const router = Router();


const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
})

router.get('/', async (req, res) => {
  const courses = await Course.find();
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  res.header('X-Total-Count', courses.length.toString());
  res.json(courses);
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await Course.findOneOrFail({ id: Number.parseInt(id) },));
})

router.post('/', async (req, res) => {
  const value: inputCourse = await schema.validateAsync(req.body);
  res.json(await Course.create(value).save());
})

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await Course.update({ id: Number.parseInt(id) }, { ...req.body }));
})

router.delete('/:id', async (req, res) => {
  res.json(await Course.delete({ id: Number.parseInt(req.params.id) }));
});

export default router;