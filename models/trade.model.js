// models/Trade.js
import mongoose from "mongoose";

const tradeSchema = new mongoose.Schema({
  tradeIn: { type: String, required: true },
  exteriorVehicleFrontPhoto: { type: String },
  exteriorVehicleBackPhoto: { type: String },
  exteriorVehicleLeftPhoto: { type: String },
  exteriorVehicleRightPhoto: { type: String },
  odometerPhoto: { type: String },
  vinPhoto: { type: String },
  interiorVehiclePhotoOne: { type: String },
  interiorVehiclePhotoTwo: { type: String },
  interiorVehiclePhotoThree: { type: String },
  makeModelDesiredCar: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  monthlyPayment: { type: String },
  bankOrCreditUnion: { type: String },
  driverLicenseFrontSide: { type: String },
  driverLicenseBackSide: { type: String },
});

const Trade = mongoose.model('Trade', tradeSchema);

export default Trade;