import mongoose from "mongoose";

const personalSchema = new mongoose.Schema({
  trade: {
    type: String,
    required: true,
    enum: ['yes', 'no'],
  },
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

  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  socialSecurity: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: String, required: true },
  hmAddr: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  country: { type: String, required: true },
  hmPhn: { type: String, required: true },
  cellPhn: { type: String },

  res: { type: String, required: true },
  mnthPay: { type: String },
  resYrs: { type: Number },

  empName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  empYrs: { type: Number },
  empAddr: { type: String, required: true },
  empCountry: { type: String, required: true },
  empState: { type: String, required: true },
  empCity: { type: String, required: true },
  empZip: { type: String, required: true },
  empHmPhn: { type: String, required: true },
  gaIncm: { type: String },
  oaIncm: { type: String },

  coApplicant: { type: Boolean, default: false },
  coApplicantData: { type: mongoose.Schema.Types.ObjectId, ref: 'Personal' },
});

const Personal = mongoose.model('Personal', personalSchema);

export default Personal;