// business.routes.js
import express from 'express';
import multer from 'multer';
import { createNewBusiness, getAllBusiness } from '../controllers/business.controller.js';

const router = express.Router();

// Set up multer to handle file uploads
const upload = multer();

router.route('/').post(
  upload.any(), // Use upload.any() middleware to handle file uploads without saving to local storage
  createNewBusiness
);

router.route('/').get(getAllBusiness);

export default router;
