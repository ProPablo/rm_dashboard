import { Request, Response, Router } from 'express';
import { Artefact, inputArtefact, schema } from '../entity/Artefact'
import Joi from 'joi';
const artefactRouter = Router();

artefactRouter.get('/', async (req, res) => {
  const courses = await Artefact.find();
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  res.header('X-Total-Count', courses.length.toString());
  res.json(courses);
})

artefactRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await Artefact.findOneOrFail({ id: Number.parseInt(id) },));
})

artefactRouter.post('/', async (req, res) => {
  const value: Object = await schema.validateAsync(req.body);
  res.json(await Artefact.create(value).save());
})

artefactRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  // res.json(await Artefact.update({ id: Number.parseInt(id) }, { ...req.body }));
  res.json(await Artefact.save({ id: Number.parseInt(id), ...req.body } ));
})

artefactRouter.delete('/:id', async (req, res) => {
  res.json(await Artefact.delete({ id: Number.parseInt(req.params.id) }));
});

export { artefactRouter };