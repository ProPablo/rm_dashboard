import { json, Request, Response, Router } from 'express';
import { Zone, inputZone, schema } from '../entity/Zone'
import Joi from 'joi';
import multer from 'multer';
import { HTTPException } from '../Errors';

const upload = multer({ dest: `public/` });
const zoneMediaRouter = Router();

// zoneMediaRouter.get('/', async (req, res) => {
//   const courses = await Zone.find();
//   res.header('Access-Control-Expose-Headers', 'X-Total-Count');
//   res.header('X-Total-Count', courses.length.toString());
//   res.json(courses);
// })

// zoneMediaRouter.get('/:id', async (req, res) => {
//   const { id } = req.params;
//   res.json(await Zone.findOneOrFail({ id: Number.parseInt(id) },));
// })

zoneMediaRouter.post('/:id', upload.single('file'), async (req, res) => {
  if (req.file) {

    console.log("Bruh got upload", JSON.stringify(req.body, null, 2));
    res.json({ message: "done" });
  } else {
    throw new HTTPException(400, "No file detected");
  }
})

// zoneMediaRouter.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   // res.json(await Zone.update({ id: Number.parseInt(id) }, { ...req.body }));
//   res.json(await Zone.save({ id: Number.parseInt(id), ...req.body }));
// })

// zoneMediaRouter.delete('/:id', async (req, res) => {
//   res.json(await Zone.delete({ id: Number.parseInt(req.params.id) }));
// });

export { zoneMediaRouter };