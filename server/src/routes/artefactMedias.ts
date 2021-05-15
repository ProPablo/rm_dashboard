import { json, Request, Response, Router } from 'express';
import multer from 'multer';
import { HTTPException } from '../Errors';
import { MediaType, ArtefactMedia } from '../entity/ArtefactMedia';
import { unlink } from 'fs/promises';

const storage = multer.diskStorage({
  destination: "public/",
  filename: (req, file, cb) => {
    // THE DATA IN FORMDATA HAS TO BE ARRANGED SO FILE IS SENT LAST
    console.log(`logging multer req ${JSON.stringify(req.body)}`);
    const ext = file.mimetype.split('/')[1];
    cb(null, `${req.body.title}-${Date.now()}.${ext}`);
  }
})

const upload = multer({ storage });
const artefactMediaRouter = Router();

artefactMediaRouter.get('/', async (req, res) => {
  const artefactMedias = await ArtefactMedia.find();
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  res.header('X-Total-Count', artefactMedias.length.toString());
  res.json(artefactMedias);
})

artefactMediaRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await ArtefactMedia.findOneOrFail({ id: Number.parseInt(id) },));
})
//Name of formdata field = file
artefactMediaRouter.post('/', upload.single('file'), async (req, res, next) => {
  if (req.file) {
    req.body.src = req.file.path;
    

    if (isNaN(req.body.type))
      req.body.type = MediaType[req.body.type];

    try {
      res.json(await ArtefactMedia.create(req.body as Object).save());
    }
    catch (e) {
      console.log("error", e);
      // delete the file 
      await unlink(req.file.path);
      throw new HTTPException(400, e.message);
    }
  }
  else {
    throw new HTTPException(400, "No file detected");
  }
})

artefactMediaRouter.put('/:id', upload.single('file'), async (req, res, next) => {
  // Fix logic, get title from db 
  const { id } = req.params;
  if (req.file) {
    req.body.src = req.file.path;

    if (isNaN(req.body.type))
      req.body.type = MediaType[req.body.type];

    try {
      res.json(await ArtefactMedia.save({ id: Number.parseInt(id), ...req.body }));
    }
    catch (e) {
      console.log("error", e);
      // delete the file 
      await unlink(req.file.path);
      throw new HTTPException(400, e.message);
    }
  }
  else {

    throw new HTTPException(400, "No file detected");
  }
})

// zoneMediaRouter.post('/:id', upload.single('file'), async (req, res) => {
//   if (req.file) {

//     console.log("Bruh got upload", JSON.stringify(req.body, null, 2));
//     res.json({ message: "done" });
//   } else {
//     throw new HTTPException(400, "No file detected");
//   }
// })

// zoneMediaRouter.put('/:id', upload.single('file'), async (req, res) => {
//   const { id } = req.params;
//   // res.json(await Zone.update({ id: Number.parseInt(id) }, { ...req.body }));
//   res.json(await ZoneMedia.save({ id: Number.parseInt(id), ...req.body }));
// })

artefactMediaRouter.delete('/:id', async (req, res) => {
  res.json(await ArtefactMedia.delete({ id: Number.parseInt(req.params.id) }));
});

export { artefactMediaRouter };