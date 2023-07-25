// trade.controller.js
import Trade from "../models/trade.model.js";
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

// Controller function to create a new trade
export const createNewTrade = async (req, res) => {
  try {
    // Save the trade data to the database
    const tradeData = req.body;

    // Upload images to Cloudinary and update the tradeData object with the image URLs
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
                  // Update the tradeData object with the Cloudinary URL using the field name
                  tradeData[fieldName] = result.secure_url;
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

    const newTrade = new Trade(tradeData);
    await newTrade.save();

    res.status(201).json({ message: "Trade created successfully." });
  } catch (error) {
    errorHandler(res, error);
  }
};


// Controller function to get the list of all trades
export const getAllTrades = async (req, res) => {
  try {
    // Fetch all trades from the database
    const trades = await Trade.find();

    // Respond with the list of trades
    res.status(200).json(trades);
  } catch (error) {
    errorHandler(res, error);
  }
};
