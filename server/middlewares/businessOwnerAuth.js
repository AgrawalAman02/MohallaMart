import User from '../models/user-model.js';

export const businessOwnerAuth = async (req, res, next) => {
  try {
    // User should already be authenticated via authMiddleware
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    // Check if user is a business owner
    if (req.user.role !== 'business-owner') {
      return res.status(403).json({ message: 'Access denied. Business owner role required.' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};