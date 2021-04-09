require('dotenv').config();
import cors from "cors";
import express, { Router } from "express";
import morgan from "morgan";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { errorMiddleware } from "./helperFunctions";
import { artefactRouter } from "./routes/artefacts";
import { beaconRouter } from "./routes/beacon";
import { isLoggedIn, loginRouter } from './routes/login';
import { zoneMediaRouter } from "./routes/zoneMedias";
import { zoneRouter } from "./routes/zones";


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

  app.use(express.static(__dirname + '/public'));

  const router = Router();

  // app.get('/test', async (req, res, next) => {
  //   const user = await User.findOneOrFail(1);
  //   res.json(user);
  // })
  app.use('/', loginRouter);

  if (process.env.NODE_ENV === "development") {
    console.log("Using development environment");
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
