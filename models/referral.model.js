import mongoose from "mongoose";


const referralSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  referringName: { type: String, required: true },
  referringEmail: { type: String, required: true },
  referringPhoneNumber: { type: String, required: true },
  carCompany: { type: String, required: true },
  carModel: { type: String, required: true },
  yearOfManufacturing: { type: Number, required: true }
});

const Referral = mongoose.model('Referral', referralSchema);

export default Referral
