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
import { zoneMediaRouter } from "./routes/zoneMedias";
import { resolve } from "path";

//this will be called by default without try catch or if next(error);
function errorMiddleware(error: any, request: Request, response: Response, next: NextFunction) {
  const resStatus = (response.statusCode != 200) ? response.statusCode : null;
  let status = error.status || resStatus || 500;
  const message = error.message || 'Something went wrong';
  response
    .status(status)
    .json({
      status,
      message,
    })
}

console.log(__dirname + "/entity")
createConnection({
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": process.env.DB_USER,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_NAME,
  "synchronize": true,
  "logging": true,
  "entities": [
    __dirname + "/entity/**.{ts,js}"
  ],
  "migrations": [
    __dirname + "/migration/**.{ts,js}"
  ]
}).then(async connection => {
  // await initDatabase();
  connection.runMigrations();
  // console.log("Loading users from the database...");
  // const users = await User.find();
  // console.log("Loaded users: ", users);
  const app = express();
  app.use(morgan('tiny'));
  app.use(express.json());
  app.use(cors());


  const router = Router();

  // app.get('/test', async (req, res, next) => {
  //   const user = await User.findOneOrFail(1);
  //   res.json(user);
  // })
  app.use('/', loginRouter);

  if (process.env.NODE_ENV === "development") {
    console.log("Using development environment");
    const publicDir = resolve(__dirname + '/../public');
    console.log("Serving static files from: " + publicDir);
    app.use('/public', express.static('public'));
  }
  else {
    router.use(isLoggedIn);
  }

  router.use('/artefacts', artefactRouter);
  router.use('/zones', zoneRouter);
  router.use('/beacons', beaconRouter);
  router.use('/zonemedia', zoneMediaRouter);

  app.use(router);

  app.use(errorMiddleware);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}).catch(error => console.log(error));
