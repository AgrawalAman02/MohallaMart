import express from 'express';
import * as analyticsController from '../../controllers/business/analyticsController.js';
import { authenticate } from '../../middlewares/authenticate.js';
import { businessOwnerAuth } from '../../middlewares/businessOwnerAuth.js';

const router = express.Router();

// Public routes for recording views/interactions
router.post('/:businessId/view', analyticsController.recordBusinessView);
router.post('/:businessId/interaction', analyticsController.recordInteraction);

// Protected routes for viewing analytics
router.use(authenticate);
router.get('/:businessId', businessOwnerAuth, analyticsController.getBusinessAnalytics);

export default router;