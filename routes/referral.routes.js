import express from 'express';

import { createNewReferral ,getAllReferral
} from '../controllers/referral.controller.js';

const router = express.Router();


router.route('/').post(createNewReferral);
router.route('/').get(getAllReferral);


export default router;