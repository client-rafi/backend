// business.controller.js
import Business from '../models/business.model.js';
import { v2 as cloudinary } from 'cloudinary';

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

// Controller function to create a new business
export const createNewBusiness = async (req, res) => {
  try {
    // Extract the data from the request body (assuming you are using a JSON request body)
    let businessData = req.body;

    // Upload images to Cloudinary and update the businessData object with the image URLs
    if (req.files) {
      for (const key in req.files) {
        const fileArray = req.files[key];
        if (fileArray && fileArray.length > 0) {
          try {
            // Access the file stream from Multer and directly upload to Cloudinary
            const result = await cloudinary.uploader.upload_stream(
              { resource_type: "auto" }, // Set resource_type to 'auto' to let Cloudinary determine the file type
              (error, result) => {
                if (error) {
                  console.error("Cloudinary Upload Error:", error);
                  return res.status(500).json({ error: "Error uploading files" });
                }
                businessData[key] = result.secure_url;
              }
            ).end(fileArray[0].buffer);
          } catch (error) {
            // Handle Cloudinary upload errors
            console.error("Cloudinary Upload Error:", error);
            return res.status(500).json({ error: "Error uploading files" });
          }
        }
      }
    }

    // Create a new instance of the Business model with the extracted data
    const business = new Business(businessData);

    // Save the business data to the database
    const savedBusiness = await business.save();

    // Respond with the saved business data
    res.status(201).json(savedBusiness);
  } catch (error) {
    errorHandler(res, error);
  }
};

// Controller function to get the list of all businesses
export const getAllBusiness = async (req, res) => {
  try {
    // Fetch all business rows from the database
    const businesses = await Business.find();

    // Respond with the list of all businesses
    res.status(200).json(businesses);
  } catch (error) {
    errorHandler(res, error);
  }
};
