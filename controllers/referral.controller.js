// referral.controller.js
import Referral from "../models/referral.model.js";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with the appropriate credentials (API Key and API Secret)
cloudinary.config({
  cloud_name: "dt5u8pnw3",
  api_key: "738738889919963",
  api_secret: "p4AA8CjQDKrJmwPoEPn2B34CzXk",
});

// Middleware to handle errors
const errorHandler = (res, error) => {
  console.error("Error:", error);
  res.status(500).json({ error: "An error occurred" });
};

// Controller function to create a new referral
export const createNewReferral = async (req, res) => {
  try {
    // Save the referral data to the database
    const referralData = req.body;

    // Upload images to Cloudinary and update the referralData object with the image URLs
    if (req.files) {
      const uploadPromises = [];

      for (const key in req.files) {
        const fileArray = req.files[key];
        if (fileArray) {
          const fieldName = fileArray.fieldname; // Get the field name from req.files
          // Create a promise-based function for Cloudinary upload
          const uploadPromise = new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
              { resource_type: "auto" }, // Set resource_type to 'auto' to let Cloudinary determine the file type
              (error, result) => {
                if (error) {
                  console.error("Cloudinary Upload Error:", error);
                  reject(error);
                } else {
                  // Update the referralData object with the Cloudinary URL using the field name
                  referralData[fieldName] = result.secure_url;
                  resolve();
                }
              }
            ).end(fileArray.buffer);
          });
          uploadPromises.push(uploadPromise);
        }
      }

      // Wait for all Cloudinary upload promises to resolve
      await Promise.all(uploadPromises);
    }

    const newReferral = new Referral(referralData);
    await newReferral.save();

    res.status(201).json({ message: newReferral });
  } catch (error) {
    errorHandler(res, error);
  }
};

// Controller function to get the list of all referrals
export const getAllReferral = async (req, res) => {
  try {
    // Fetch all referrals from the database
    const referrals = await Referral.find();

    // Respond with the list of referrals
    res.status(200).json(referrals);
  } catch (error) {
    errorHandler(res, error);
  }
};
