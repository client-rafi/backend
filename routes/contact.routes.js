import express from "express";

import {
    createNewContact , getAllContact
} from "../controllers/contact.controller.js";

const router = express.Router();

router.route('/').post(createNewContact);
router.route("/").get(getAllContact);

export default router;