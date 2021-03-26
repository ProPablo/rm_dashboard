import { Request, Response, Router } from 'express';
import { Registration, inputRegistration, schema } from '../entity/Registration'
import Joi from 'joi';
import { getRepository } from 'typeorm';
import { Student } from '../entity/Student';
const router = Router();

router.get('/', async (req, res) => {
  // const courses = await Registration.find();
  const courses = await getRepository(Registration)
    .createQueryBuilder("r")
    .leftJoinAndSelect("r.student", "student")
    .getMany()
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  res.header('X-Total-Count', courses.length.toString());
  res.json(courses);
})

router.get('/:id', async (req, res) => {
  let { id }: any = req.params;
  id = Number.parseInt(id);
  const registration = await getRepository(Registration)
    .createQueryBuilder("r")
    .leftJoinAndSelect("r.student", "student")
    .where("r.id = :id", { id })
    .getOneOrFail();
  res.json(registration);
  // res.json(await Registration.findOneOrFail({ id: Number.parseInt(id) },));
})

router.post('/', async (req, res) => {
  const value: inputRegistration = await schema.validateAsync(req.body);
  res.json(await Registration.create(value).save());
})

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await Registration.update({ id: Number.parseInt(id) }, { ...req.body }));
})

router.delete('/:id', async (req, res) => {
  res.json(await Registration.delete({ id: Number.parseInt(req.params.id) }));
});

export default router;