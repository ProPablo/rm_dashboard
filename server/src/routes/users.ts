import { Request, Response, Router } from 'express';
import { User } from '../entity/User';
import Joi from 'joi';
import { getRepository } from 'typeorm';
const router = Router();

interface inputUser {
  name: string,
  email: string,

}
const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(/^(?:\S(?!\\)){3,30}$/i), //All non whitespace chars excluding /
  email: Joi.string().pattern(/^[a-z0-9]{3,}@[a-z0-9]{3,}\.[a-z0-9]{2,}$/i).required()
});

router.get('/', async (req, res) => {
  const users = await getRepository(User)
    .createQueryBuilder("u")
    .select(["u.id", "u.name", "u.email"])
    .getMany();

  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  res.header('X-Total-Count', users.length.toString());
  res.json(users);
})

router.get('/:id', async (req, res) => {
  let { id }: any = req.params;
  id = Number.parseInt(id);
  const user = await User.getRepository()
    .createQueryBuilder("u")
    .select(["u.id", "u.name", "u.email"])
    .where("u.id = :id", { id })
    .getOneOrFail();
  res.json(user);
})

router.post('/', async (req, res) => {
  const value: inputUser = await schema.validateAsync(req.body);
  res.json(await User.create(value).save());
})

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await User.update({ id: Number.parseInt(id) }, { ...req.body }));
})

router.delete('/:id', async (req, res) => {
  res.json(await User.delete({ id: Number.parseInt(req.params.id) }));
});

export default router;