import { Request, Response, Router } from 'express';
import { User } from '../entity/User';
import { HTTPException } from '../Errors';
import { sign, Secret, TokenExpiredError, verify } from 'jsonwebtoken';
import { compare } from 'bcrypt';
const loginRouter = Router();

const JWT_EXPIRY = "10 days";

loginRouter.post('/', async (req, res, next) => {
  let admin: User;
  try {
    admin = await User.findOneOrFail({ email: req.body.email });
  }
  catch {
    throw new HTTPException(403, `No user found with email ${req.body.email}`);
  }
  console.log({ got: req.body.password, db: admin.password });
  const match = await compare(req.body.password, admin.password);

  if (match) {
    const payload = {
      name: admin.name,
      email: admin.email
    }
    console.log(payload);
    const token = await sign(payload, process.env.SECRET as Secret, { expiresIn: JWT_EXPIRY })
    return res.json({ token });
  }
  else {
    throw new HTTPException(403, "Incorrect password");
  }
});


export async function isLoggedIn(req: Request, res: Response, next: Function) {
  const header = req.header('Authorization');
  if (header) {
    try {
      const decoded = await verify(header.slice(7), process.env.SECRET as Secret);
      console.log("Decoded", { decoded });
      if (decoded) {
        req.user = decoded;
        return next();
      }
      throw "Token does not exist";
    } catch (error) {
      console.log(error);
      if (error instanceof TokenExpiredError) {
        res.status(401);
        return next(new Error(`Token expired`))
      }
      res.status(401);
      return next(new Error('invalid token'))
    }
  }
  res.status(401);
  next(new Error("No Auth header"));
}

export { loginRouter };