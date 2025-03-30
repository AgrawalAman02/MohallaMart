import express from 'express';
import * as hoursController from '../../controllers/business/hoursController.js';
import { authenticate } from '../../middlewares/authenticate.js';
import { businessOwnerAuth } from '../../middlewares/businessOwnerAuth.js';

const router = express.Router();

router.use(authenticate);

// Update business hours
router.put('/:businessId', businessOwnerAuth, hoursController.updateBusinessHours);

// Get business hours
router.get('/:businessId', hoursController.getBusinessHours);

export default router;