// trade.controller.js
import Trade from "../models/trade.model.js";
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

// Controller function to create a new trade
export const createNewTrade = async (req, res) => {
  try {
    // Extract trade data from the request body
    const tradeData = req.body;

    // Extract image URLs from the req.files object and directly upload to Cloudinary
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
                tradeData[key] = result.secure_url;
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

    // Create a new trade object
    const newTrade = new Trade(tradeData);

    // Save the trade object to the database
    const savedTrade = await newTrade.save();

    // Respond with the newly created trade
    res.status(201).json(savedTrade);
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
