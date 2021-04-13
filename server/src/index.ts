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
import { resolve } from "path";
import { zoneRouter } from "./routes/zones";
import swagggerUI from 'swagger-ui-express';
import swaggerDoc from './swagger.json';

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
  const PORT = process.env.PORT || 3000;

  connection.runMigrations();
  // console.log("Loading users from the database...");
  // const users = await User.find();
  // console.log("Loaded users: ", users);
  const app = express();
  app.use(morgan('tiny'));
  app.use(express.json());
  app.use(cors());

  app.use('/login', loginRouter);

  const router = Router();

  // app.get('/test', async (req, res, next) => {
  //   const user = await User.findOneOrFail(1);
  //   res.json(user);
  // })


  if (process.env.NODE_ENV === "development") {
    console.log("Using development environment");
    const publicDir = resolve(__dirname + '/../public');
    console.log("Serving static files from: " + publicDir);
    app.use('/public', express.static('public'));
    swaggerDoc.host = `localhost:${PORT}`
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
  router.use('/zonemedia', zoneMediaRouter);

  router.get('/about', (req, res)=> {
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
