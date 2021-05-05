require('dotenv').config();
import cors from "cors";
import express, { Router } from "express";
import morgan from "morgan";
import { resolve } from "path";
import "reflect-metadata";
import swagggerUI from 'swagger-ui-express';
import { createConnection } from "typeorm";
import { errorMiddleware } from "./helperFunctions";
import { artefactRouter } from "./routes/artefacts";
import { beaconRouter } from "./routes/beacon";
import { exhibitionRouter } from "./routes/exhibition";
import { isLoggedIn, loginRouter } from './routes/login';
import { storeItemRouter } from "./routes/storeItem";
import { artefactMediaRouter } from "./routes/artefactMedias";
import { zoneRouter } from "./routes/zones";
import swaggerDoc from './swagger.json';

const isDevelopment = process.env.NODE_ENV === "development";


createConnection({
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": process.env.DB_USER,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_NAME,
  "synchronize": true,
  "logging": isDevelopment ? true : ["error", "warn", "info",],
  "entities": [
    __dirname + "/entity/**.{ts,js}" // TODO: clarity change import each entity
  ],
  "migrations": [
    __dirname + "/migration/**.{ts,js}"
  ]
}).then(async connection => {
  const PORT = process.env.PORT || 3000;

  connection.runMigrations();
  // console.log("Loading users from the database...");
  // const users = await User.find();
  // console.log("Loaded users: ", users);
  const app = express();
  app.use(morgan('tiny'));
  // app.use(express.json());
  app.use(express.json({ limit: '5mb' })); //accomodates for 500 x 500
  app.use(cors());

  app.use('/login', loginRouter);

  const router = Router();

  // app.get('/test', async (req, res, next) => {
  //   const user = await User.findOneOrFail(1);
  //   res.json(user);
  // })


  if (isDevelopment) {
    console.log("Using development environment");
    const publicDir = resolve(__dirname + '/../public');
    console.log("Serving static files from: " + publicDir);
    app.use('/public', express.static('public'));
    swaggerDoc.host = `localhost:${PORT}`
    swaggerDoc.basePath = '/';
  }
  else {
    // router.use(isLoggedIn);
    router.post("*", isLoggedIn);
    router.put("*", isLoggedIn);
    router.delete("*", isLoggedIn);
  }

  app.use('/swagger', swagggerUI.serve, swagggerUI.setup(swaggerDoc));

  router.use('/artefacts', artefactRouter);
  router.use('/zones', zoneRouter);
  router.use('/beacons', beaconRouter);
  router.use('/artefactmedia', artefactMediaRouter);
  router.use('/exhibitions', exhibitionRouter);
  router.use('/storeItems', storeItemRouter);

  router.get('/about', (req, res) => {
    res.json({
      companyName: "Redland Museum",
      streetName: "60 Smith Street",
      addressDetails: "Cleveland, QLD 4165",
      phone: "+7 32863494",
      email: "admin@redlandmuseum.com.au"
    });
  })
  app.use(router);

  app.use(errorMiddleware);

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}).catch(error => console.log(error));
