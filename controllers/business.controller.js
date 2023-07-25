import Business from '../models/business.model.js';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dt5u8pnw3',
  api_key: '738738889919963',
  api_secret: 'p4AA8CjQDKrJmwPoEPn2B34CzXk',
});

const createNewBusiness = async (req, res) => {
  try {
    // Extract the data from the request body (assuming you are using a JSON request body)
    let businessData = req.body;

    // Extract image URLs from the req.files object
    if (req.files) {
      for (const key in req.files) {
        const fileArray = req.files[key];
        if (fileArray && fileArray.length > 0) {
          // Assuming you are using cloudinary to store images, upload the image and store its URL in the businessData
          const result = await cloudinary.uploader.upload(fileArray[0].path);
          businessData[key] = result.secure_url;
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
    // If there's an error, respond with an error message
    console.error('Error saving business data:', error);
    res.status(500).json({ error: 'Error saving business data' });
  }
};

const getAllBusiness = async (req, res) => {
  try {
    // Fetch all business rows from the database
    const businesses = await Business.find();

    // Respond with the list of all businesses
    res.status(200).json(businesses);
  } catch (error) {
    // If there's an error, respond with an error message
    console.error('Error fetching business data:', error);
    res.status(500).json({ error: 'Error fetching business data' });
  }
};

export { createNewBusiness, getAllBusiness };
