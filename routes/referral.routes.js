// referral.routes.js
import express from 'express';
import multer from 'multer';
import { createNewReferral, getAllReferral } from '../controllers/referral.controller.js';

const router = express.Router();

// Set up multer to handle file uploads
const upload = multer();

router.route('/').post(
  upload.any(), // Use upload.any() middleware to handle file uploads without saving to local storage
  createNewReferral
);

router.route('/').get(getAllReferral);

export default router;
