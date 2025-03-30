import jwt from 'jsonwebtoken';
import User from '../models/user-model.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Handle different token structures
    const userId = decoded.user?.id || decoded.id;
    
    if (!userId) {
      return res.status(401).json({ message: 'Invalid token format' });
    }
    
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    // Set the complete user object in the request
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    console.error('Auth middleware error:', error);
    res.status(500).json({ message: error.message });
  }
};