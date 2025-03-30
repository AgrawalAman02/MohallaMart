import BusinessHours from '../../models/businessHours.js';
import Business from '../../models/business-model.js';

export const updateBusinessHours = async (req, res) => {
  try {
    const { businessId } = req.params;
    const updates = req.body;

    // Verify business ownership
    const business = await Business.findOne({ 
      _id: businessId, 
      owner: req.user._id 
    });

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    let businessHours = await BusinessHours.findOne({ businessId });

    if (!businessHours) {
      businessHours = new BusinessHours({
        businessId,
        ...updates
      });
    } else {
      Object.keys(updates).forEach(key => {
        businessHours[key] = updates[key];
      });
    }

    await businessHours.save();
    res.json(businessHours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBusinessHours = async (req, res) => {
  try {
    const businessHours = await BusinessHours.findOne({ 
      businessId: req.params.businessId 
    });

    if (!businessHours) {
      return res.status(404).json({ message: 'Business hours not found' });
    }

    res.json(businessHours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};