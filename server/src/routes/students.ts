import { Request, Response, Router } from 'express';
import { Student, schema } from '../entity/Student';
import { HTTPException } from '../Errors';
import Joi from 'joi';
import { getRepository } from 'typeorm';
import { Timestamp } from '../entity/Timestamp';
import { Source } from '../entity/Source';
import { Registration } from '../entity/Registration';
const router = Router();

interface InputStudent {
  firstName: string,
  lastName: string,
  email: string,
  sourceId: number
}
// // Very dumb code please excuse for testing purposes
// function isStringUndefined(s: string): string | void {
//   if (!s) return `${s} is undefined`;
// }

// function isStringNotString(s: string): string | void {
//   if (typeof s != 'string') return `${s} is not a string`;
// }

// function validateStudent(s: InputStudent): InputStudent {
//   // if (s.age !== undefined && !(typeof s.age == 'number' && Number.isInteger(s.age))) throw new HTTPException(400, "age not valid");
//   if (s.firstName === undefined || typeof s.firstName != 'string' || s.firstName.length < 3) throw new HTTPException(400, "Invalid firstName (possibly too short)");
//   const emailRegex = new RegExp("^[a-z0-9]{3,}@[a-z0-9]{3,}\.[a-z0-9]{2,}$", "i");
//   if (s.email === undefined || typeof s.email != "string" || emailRegex.test(s.email)) throw new HTTPException(400, "Email not valid");
//   const lastNameChecks = [isStringUndefined, isStringNotString, (str: string) => { if (str.length < 3) return `${s} is too short` }];
//   const lastNameError = lastNameChecks.reduce((error: string, func: Function) => func(s.lastName), "");
//   if (lastNameError) throw new HTTPException(400, lastNameError);

//   return {
//     age: s.age,
//     firstName: s.firstName,
//     lastName: s.lastName,
//     email: s.email
//   }
// }


router.get('/', async (req, res) => {
  //Normal find does not do relation joining
  const students = await Student.find();
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  res.header('X-Total-Count', students.length.toString());
  res.json(students);
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  //Relations do joins automatically
  const student = await Student.findOneOrFail({ id: Number.parseInt(id) });
  const registrations = await getRepository(Registration)
    .createQueryBuilder("r")
    .leftJoin(Student, "s", "s.id = r.studentId")
    .where("s.id = :id", { id })
    .getMany()
  student.registrations = registrations;
  res.json(student);
})

router.get('/:id/timestamps', async (req, res) => {
  let { id }: any = req.params;
  id = Number.parseInt(id);
  const timestamps = await getRepository(Timestamp)
    .createQueryBuilder("t")
    .leftJoin(Student, "s", "s.id = t.studentId")
    .where("s.id = :id", { id })
    .getMany()
  res.json(timestamps);
})

router.post('/', async (req, res) => {
  const value: InputStudent = await schema.validateAsync(req.body);
  console.log("got here")
  res.json(await Student.create(value).save());
})

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await Student.update({ id: Number.parseInt(id) }, { ...req.body }));
})

router.delete('/:id', (req, res) => {
  Student.delete({ id: Number.parseInt(req.params.id) });
  res.json('done');
});

export default router;