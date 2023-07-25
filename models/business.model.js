// models/LoanApplication.js
import mongoose from "mongoose";
const businessSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  preferredContactMethod: { type: String, required: true },
  preferredContactTime: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  mortgageOrRentPayment: { type: String, required: true },
  monthlyIncome: { type: String, required: true },
  creditScore: { type: String, required: true },
  loanAmountRequired: { type: String, required: true },
  loanPurpose: { type: String, required: true },
  employmentStatus: { type: String, required: true },
  socialSecurityNumber: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  howDidYouHearAboutUs: { type: String, required: true },
  additionalComments: { type: String },
  consent: { type: Boolean, required: true },
  tradeIn: { type: String, required: true },
  makeModelDesiredCar: { type: String, required: true },
  businessName: { type: String },
  businessPhoneNumber: { type: String },
  mobilePhoneNumber: { type: String },
  websiteAddress: { type: String },
  taxIdNumber: { type: String },
  yearsEstablished: { type: String },
  grossAnnualRevenue: { type: String },
  natureOfBusiness: { type: String },
  businessAddress: { type: String },
  homeAddress: { type: String },
  officersInformation: { type: String },
  additionalOfficers: { type: String },
  references: [
    {
      name: { type: String },
      address: { type: String },
      phoneNumber: { type: String },
    },
  ],
  vehicles: [
    {
      vehicleYear: { type: String },
      vehicleMake: { type: String },
      vehicleModel: { type: String },
      classification: { type: String },
    },
  ],
  banks: [
    {
      bankName: { type: String },
      bankPhoneNumber: { type: String },
      bankContactName: { type: String },
      bankAccountNumber: { type: String },
    },
  ],
});

const Business = mongoose.model('LoanApplication', businessSchema);

export default Business