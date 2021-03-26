require('dotenv').config();
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import "reflect-metadata";
import { Connection, createConnection, getConnection } from "typeorm";
import { User } from "./entity/User";
import timestampRouter from './routes/timestamps';
import studentRouter from './routes/students';
import userRouter from './routes/users';
import courseRouter from './routes/courses';
import sourceRouter from './routes/sources';
import registrationRouter from './routes/registrations';

//this will be called by default without try catch or if next(error);
function errorMiddleware(error: any, request: Request, response: Response, next: NextFunction) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response
    .status(status)
    .json({
      status,
      message,
    })
}

async function initDatabase() {
  console.log("Inserting a new user into the database...");
  let newUser = await User.findOne({ email: "anhadrs@gmail.com" });
  if (!newUser) {
    newUser = await User.create({ email: "anhadrs@gmail.com", name: "anhad", password: "test" }).save();
    console.log("Saved a new user with id: " + newUser.id);
  }
}

createConnection().then(async connection => {
  // await initDatabase();
  connection.runMigrations();
  console.log("Loading users from the database...");
  const users = await User.find();
  console.log("Loaded users: ", users);
  const app = express();
  app.use(morgan('tiny'));
  app.use(express.json());
  app.use(cors());

  app.get('/test', async (req, res, next) => {
    const user = await User.findOneOrFail(1);
    res.json(user);
  })

  app.use('/timestamps', timestampRouter);
  app.use('/students', studentRouter);
  app.use('/users', userRouter);
  app.use('/courses', courseRouter);
  app.use('/sources', sourceRouter);
  app.use('/registrations', registrationRouter);

  app.use(errorMiddleware);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}).catch(error => console.log(error));
