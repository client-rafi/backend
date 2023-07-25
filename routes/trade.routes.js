import express from 'express';
import multer from 'multer';

import { createNewTrade, getAllTrades } from '../controllers/trade.controller.js';

const router = express.Router();

// Set up multer to handle file uploads
const upload = multer({ dest: 'uploads/' }); // You can customize the destination folder as per your requirement

router.route('/').post(
    upload.fields([
      { name: 'exteriorVehicleFrontPhoto', maxCount: 1 },
      { name: 'exteriorVehicleBackPhoto', maxCount: 1 },
      { name: 'exteriorVehicleLeftPhoto', maxCount: 1 },
      { name: 'exteriorVehicleRightPhoto', maxCount: 1 },
      { name: 'odometerPhoto', maxCount: 1 },
      { name: 'vinPhoto', maxCount: 1 },
      { name: 'interiorVehiclePhotoOne', maxCount: 1 },
      { name: 'interiorVehiclePhotoTwo', maxCount: 1 },
      { name: 'interiorVehiclePhotoThree', maxCount: 1 },
      { name: 'driverLicenseFrontSide', maxCount: 1 },
      { name: 'driverLicenseBackSide', maxCount: 1 },
    ]),
    createNewTrade
  );

router.route('/').get(getAllTrades);

export default router;
