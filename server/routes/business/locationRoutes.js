import express from 'express';
import * as locationController from '../../controllers/business/locationController.js';
import { authenticate } from '../../middlewares/authenticate.js';
import { businessOwnerAuth } from '../../middlewares/businessOwnerAuth.js';

const router = express.Router();

// Public routes
router.get('/nearby', locationController.searchNearbyBusinesses);

// Protected routes
router.use(authenticate);

// Update business location
router.put('/:businessId', businessOwnerAuth, locationController.updateBusinessLocation);

// Get business location
router.get('/:businessId', locationController.getBusinessLocation);

export default router;