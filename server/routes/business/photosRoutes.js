import express from 'express';
import { uploadBusinessPhotos, setMainPhoto } from '../../controllers/business/photosController.js';
import { upload } from '../../middlewares/uploadHandler.js';
import { authenticate } from '../../middlewares/authenticate.js';
import { businessOwnerAuth } from '../../middlewares/businessOwnerAuth.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(authenticate);

// Upload photos (with multer middleware)
router.post('/:id/photos', 
  businessOwnerAuth, 
  upload.array('photos', 10), 
  uploadBusinessPhotos
);

// Set main photo
router.put('/:id/main-photo', 
  businessOwnerAuth, 
  setMainPhoto
);

export default router;