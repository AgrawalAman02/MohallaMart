import express from 'express';
import Business from '../models/business-model.js';
import Deal from '../models/deal-model.js';
import authenticate from '../middlewares/authenticate.js';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

// Get all businesses (with optional filtering)
router.get('/', async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const query = {};
    
    if (category) {
      query.category = category;
    }
    
    const businesses = await Business.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
      
    const count = await Business.countDocuments(query);
    
    res.json({
      businesses,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search businesses
router.get('/search', async (req, res) => {
  try {
    const { 
      q, 
      lat, 
      lng, 
      radius = 5, // default 5km
      category,
      page = 1,
      limit = 10
    } = req.query;
    
    const query = {};
    
    // Replace text search with regex search: match using the first half of the query
    if (q) {
      const halfLength = Math.ceil(q.length / 2);
      const pattern = q.substring(0, halfLength);
      const regex = new RegExp(pattern, 'i');
      query.$or = [
        { name: regex },
        { description: regex }
      ];
    }
    
  
    // Add category filter
    if (category) {
      query.category = category;
    }
    
    const businesses = await Business.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
      
    const count = await Business.countDocuments(query);
    
    res.json({
      businesses,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/searchItems', async (req, res) => {
  try {
    const { q, category, page = 1, limit = 10 } = req.query;
    
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const query = {
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { keywords: { $regex: q, $options: 'i' } },
        { 'address.city': { $regex: q, $options: 'i' } },
        { 'address.street': { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } }
      ]
    };

    if (category) {
      query.category = category;
    }

    const businesses = await Business.find(query)
      .sort({ averageRating: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Business.countDocuments(query);

    res.json({
      businesses,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalResults: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single business by ID
router.get('/:id', async (req, res) => {
  try {
    const business = await Business.findById(req.params.id)
      .populate('activeDeals');
      
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    
    res.json(business);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new business (requires authentication)
router.post('/', authenticate, async (req, res) => {
  try {
    // Extract photos from request body
    const { photos, mainPhoto, ...businessData } = req.body;
    
    // Create new business with uploaded photo URLs
    const newBusiness = new Business({
      ...businessData,
      photos: photos || [],
      mainPhoto: mainPhoto || (photos && photos[0]) || '',
      owner: req.user.id
    });
    
    const savedBusiness = await newBusiness.save();
    res.status(201).json(savedBusiness);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a business
router.put('/:id', authenticate, async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    
    // Only owner or admin can update
    if (business.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this business' });
    }
    
    const updatedBusiness = await Business.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json(updatedBusiness);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a business
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    
    // Only owner or admin can delete
    if (business.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this business' });
    }
    
    await business.remove();
    res.json({ message: 'Business deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;