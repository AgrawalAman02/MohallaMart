import express from 'express';
import * as businessController from '../../controllers/business/businessController.js';
import { authenticate } from '../../middlewares/authenticate.js';
import { businessOwnerAuth } from '../../middlewares/businessOwnerAuth.js';
import { upload } from '../../middlewares/uploadHandler.js';

const router = express.Router();

// Protected routes (require authentication)
router.use(authenticate);

// Create new business with file upload support
router.post('/', 
  businessOwnerAuth, 
  upload.single('mainPhoto'), // Add middleware to handle file upload
  businessController.createBusiness
);

// Get businesses owned by user
router.get('/my-businesses', businessOwnerAuth, businessController.getBusinessesByOwner);

// Get single business
router.get('/:id', businessController.getBusiness);

// Update business
router.put('/:id', businessOwnerAuth, businessController.updateBusiness);

// Delete business
router.delete('/:id', businessOwnerAuth, businessController.deleteBusiness);


export default router;