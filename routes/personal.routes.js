// personal.routes.js
import express from 'express';
import multer from 'multer';
import { createNewPersonal, getAllPersonalData } from '../controllers/personal.controller.js';

const router = express.Router();

// Set up multer to handle file uploads
const upload = multer();

router.route('/').post(
  upload.any(), // Use upload.any() middleware to handle file uploads without saving to local storage
  createNewPersonal
);

router.route('/').get(getAllPersonalData);

export default router;
