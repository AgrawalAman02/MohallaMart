import Business from '../../models/business-model.js';
import BusinessHours from '../../models/businessHours.js';
import BusinessLocation from '../../models/businessLocation.js';
import BusinessAnalytics from '../../models/businessAnalytics.js';

export const createBusiness = async (req, res) => {
    try {
      console.log('Request body:', req.body);
      
      // Extract fields from form data
      const { 
        name, 
        description, 
        category,
        contactInfo,
        address, 
        businessHours,
        location
      } = req.body;
  
      // Parse JSON strings if needed
      const parsedContactInfo = typeof contactInfo === 'string' 
        ? JSON.parse(contactInfo) 
        : contactInfo || {};
      
      const parsedAddress = typeof address === 'string'
        ? JSON.parse(address)
        : address || {};
      
      const parsedHours = typeof businessHours === 'string'
        ? JSON.parse(businessHours)
        : businessHours || {};
      
      const parsedLocation = typeof location === 'string'
        ? JSON.parse(location)
        : location || { type: 'Point', coordinates: [0, 0] };
  
      // Validate required fields
      if (!name || !description || !category) {
        return res.status(400).json({
          message: 'Missing required fields: name, description, and category are required'
        });
      }
  
      // Create the business document directly with embedded data
      const business = new Business({
        owner: req.user._id,
        name,
        description,
        category,
        contactInfo: parsedContactInfo,
        address: parsedAddress,
        businessHours: parsedHours,
        // Set the location directly in the business document
        location: {
          type: 'Point',
          coordinates: parsedLocation.coordinates || [0, 0]
        }
      });
  
      // Handle file upload for mainPhoto if present
      if (req.file) {
        business.mainPhoto = `/uploads/${req.file.filename}`;
      }
  
      // Save the business
      await business.save();
  
      // Return the created business
      res.status(201).json(business);
    } catch (error) {
      console.error('Business creation error:', error);
      res.status(500).json({ message: error.message });
    }
  };

// Keep other existing controller methods...
export const updateBusiness = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const business = await Business.findOne({ 
      _id: id, 
      owner: req.user._id 
    });

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    Object.keys(updates).forEach(key => {
      business[key] = updates[key];
    });

    await business.save();
    res.json(business);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id)
      .populate('businessHours')
      .populate('location');

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    res.json(business);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBusinessesByOwner = async (req, res) => {
  try {
    const businesses = await Business.find({ owner: req.user._id })
      .populate('businessHours')
      .populate('location');

    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBusiness = async (req, res) => {
  try {
    const business = await Business.findOneAndDelete({ 
      _id: req.params.id, 
      owner: req.user._id 
    });

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    // Delete related data
    await BusinessHours.deleteOne({ businessId: business._id });
    await BusinessLocation.deleteOne({ businessId: business._id });
    await BusinessAnalytics.deleteOne({ businessId: business._id });

    res.json({ message: 'Business deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};