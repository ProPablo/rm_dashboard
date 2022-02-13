import { Router } from 'express';
import { getEnvValue, setEnvValue, readEnvVars } from '../envhelper';

export const aboutRouter = Router();

aboutRouter.get('/', async (req, res) => {
    const rssi = process.env.rssi ? process.env.rssi : 97;
    const beaconTimeout = process.env.beaconTimeout ? process.env.beaconTimeout : 30;
     
    res.json({
        companyName: "Redland Museum",
        streetName: "60 Smith Street",
        addressDetails: "Cleveland, QLD 4165",
        phone: "+7 32863494",
        email: "admin@redlandmuseum.com.au",
        rssi,
        beaconTimeout,
    });
})

aboutRouter.post('/', async(req, res) => {
    setEnvValue("rssi", req.body.rssi);
    setEnvValue("beaconTimeout", req.body.beaconTimeout);
    process.env.rssi = req.body.rssi;
    process.env.beaconTimeout = req.body.beaconTimeout;
    res.send(200);
})