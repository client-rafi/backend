import express from "express";
import multer from 'multer';
import {
  createNewPersonal,
  getAllPersonalData,
} from "../controllers/personal.controller.js";

const router = express.Router();

// Set up multer to handle file uploads
const upload = multer({ dest: 'uploads/' });

// Use upload.fields() middleware to handle file uploads for specific fields
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
  createNewPersonal
);

router.route("/").get(getAllPersonalData);

export default router;
