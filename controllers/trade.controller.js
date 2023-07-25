import Trade from "../models/trade.model.js";
import {v2 as cloudinary} from 'cloudinary';

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
          
cloudinary.config({ 
  cloud_name: 'dt5u8pnw3', 
  api_key: '738738889919963', 
  api_secret: 'p4AA8CjQDKrJmwPoEPn2B34CzXk' 
});

// Middleware to handle errors
const errorHandler = (res, error) => {
  console.error("Error:", error);
  res.status(500).json({ error: "An error occurred" });
};

const createNewTrade = async (req, res) => {
  try {
    // Extract trade data from the request body
    const tradeData = req.body;

    // Extract image URLs from the req.files object
    if (req.files) {
      for (const key in req.files) {
        const fileArray = req.files[key];
        if (fileArray && fileArray.length > 0) {
          // Assuming you are using cloudinary to store images, upload the image and store its URL in the tradeData
          const result = await cloudinary.uploader.upload(fileArray[0].path);
          tradeData[key] = result.secure_url;
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
const getAllTrades = async (req, res) => {
  try {
    // Fetch all trades from the database
    const trades = await Trade.find();

    // Respond with the list of trades
    res.status(200).json(trades);
  } catch (error) {
    errorHandler(res, error);
  }
};

export{
    createNewTrade,
  getAllTrades,
};
