require('dotenv').config();
import cors from "cors";
import express, { NextFunction, Request, Response, Router } from "express";
import morgan from "morgan";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { loginRouter, isLoggedIn } from './routes/login';
import { artefactRouter } from "./routes/artefacts";
import { beaconRouter } from "./routes/beacon";
import { zoneRouter } from "./routes/zones";

//this will be called by default without try catch or if next(error);
function errorMiddleware(error: any, request: Request, response: Response, next: NextFunction) {
  const status = error.status || response.status || 500;
  const message = error.message || 'Something went wrong';
  response
    .status(status)
    .json({
      status,
      message,
    })
}

createConnection().then(async connection => {
  // await initDatabase();
  // connection.runMigrations();
  // console.log("Loading users from the database...");
  // const users = await User.find();
  // console.log("Loaded users: ", users);
  const app = express();
  app.use(morgan('tiny'));
  app.use(express.json());
  app.use(cors());
  const route = Router();

  // app.get('/test', async (req, res, next) => {
  //   const user = await User.findOneOrFail(1);
  //   res.json(user);
  // })
  app.use('/login', loginRouter);
  route.use(isLoggedIn);

  route.use('/artefacts', artefactRouter);
  route.use('/zones', zoneRouter);
  route.use('/beacons', beaconRouter);

  app.use(errorMiddleware);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}).catch(error => console.log(error));
