import BusinessLocation from '../../models/businessLocation.js';
import Business from '../../models/business-model.js';

export const updateBusinessLocation = async (req, res) => {
  try {
    const { businessId } = req.params;
    const locationData = req.body;

    // Verify business ownership
    const business = await Business.findOne({ 
      _id: businessId, 
      owner: req.user._id 
    });

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    let location = await BusinessLocation.findOne({ businessId });

    if (!location) {
      location = new BusinessLocation({
        businessId,
        ...locationData
      });
    } else {
      Object.keys(locationData).forEach(key => {
        location[key] = locationData[key];
      });
    }

    await location.save();
    res.json(location);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBusinessLocation = async (req, res) => {
  try {
    const location = await BusinessLocation.findOne({ 
      businessId: req.params.businessId 
    });

    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    res.json(location);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchNearbyBusinesses = async (req, res) => {
  try {
    const { longitude, latitude, radius = 5000 } = req.query;

    const businesses = await BusinessLocation.find({
      coordinates: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(radius)
        }
      }
    }).populate('businessId');

    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};