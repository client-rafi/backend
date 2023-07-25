// trade.routes.js
import express from 'express';
import multer from 'multer';
import { createNewTrade, getAllTrades } from '../controllers/trade.controller.js';

const router = express.Router();

// Set up multer to handle file uploads
const upload = multer();

router.route('/').post(
  upload.any(), // Use upload.any() middleware to handle file uploads without saving to local storage
  createNewTrade
);

router.route('/').get(getAllTrades);

export default router;
