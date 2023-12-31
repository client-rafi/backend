// personal.controller.js
import Personal from "../models/personal.model.js";
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

// Controller function to create a new personal
export const createNewPersonal = async (req, res) => {
  try {
    // Save the form data to the database
    const personalData = req.body;

    // Upload images to Cloudinary and update the personalData object with the image URLs
    if (req.files) {
      const uploadPromises = [];

      for (const key in req.files) {
        const fileArray = req.files[key];
        if (fileArray && fileArray.length > 0) {
          // Create a promise-based function for Cloudinary upload
          const uploadPromise = new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
              { resource_type: "auto" }, // Set resource_type to 'auto' to let Cloudinary determine the file type
              (error, result) => {
                if (error) {
                  console.error("Cloudinary Upload Error:", error);
                  reject(error);
                } else {
                  // Update the personalData object with the Cloudinary URL using the field name
                  personalData[key] = result.secure_url;
                  resolve();
                }
              }
            ).end(fileArray[0].buffer);
          });
          uploadPromises.push(uploadPromise);
        }
      }

      // Wait for all Cloudinary upload promises to resolve
      await Promise.all(uploadPromises);
    }

    const personal = new Personal(personalData);
    await personal.save();

    res.status(201).json({ message: "Form submitted successfully." });
  } catch (error) {
    errorHandler(res, error);
  }
};

// Controller function to get the list of all personal data
export const getAllPersonalData = async (req, res) => {
  try {
    // Fetch all personal data from the database
    const personal = await Personal.find();

    // Respond with the list of personal data
    res.status(200).json(personal);
  } catch (error) {
    errorHandler(res, error);
  }
};
