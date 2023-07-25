import Personal from "../models/personal.model.js";
import PDFDocument from "pdfkit";
import nodemailer from "nodemailer";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

cloudinary.config({
  cloud_name: "dt5u8pnw3",
  api_key: "738738889919963",
  api_secret: "p4AA8CjQDKrJmwPoEPn2B34CzXk",
});

const createNewPersonal = async (req, res) => {
  try {
    // Save the form data to the database
    const personalData = req.body;

    // Upload images to Cloudinary and update the personalData object with the image URLs
    if (req.files) {
      for (const key in req.files) {
        const fileArray = req.files[key];
        if (fileArray && fileArray.length > 0) {
          const result = await cloudinary.uploader.upload(fileArray[0].path);
          personalData[key] = result.secure_url;
        }
      }
    }

    const personal = new Personal(personalData);
    await personal.save();

  

    res.status(201).json({ message: "Form submitted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};



const getAllPersonalData= async (req, res) => {
  try {
    // Fetch all personal from the database
    const personal = await Personal.find();

    // Respond with the list of personal
    res.status(200).json(personal);
  } catch (error) {
    // If there's an error, respond with an error message
    console.error("Error fetching personal:", error);
    res.status(500).json({ error: "Error fetching contacts" });
  }
};



export { createNewPersonal,getAllPersonalData };
