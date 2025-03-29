import BusinessAnalytics from '../../models/businessAnalytics.js';
import Business from '../../models/business-model.js';

export const getBusinessAnalytics = async (req, res) => {
  try {
    const { businessId } = req.params;
    const { startDate, endDate } = req.query;

    // Verify business ownership
    const business = await Business.findOne({ 
      _id: businessId, 
      owner: req.user._id 
    });

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    const analytics = await BusinessAnalytics.findOne({ businessId });

    if (!analytics) {
      return res.status(404).json({ message: 'Analytics not found' });
    }

    // Filter data by date range if provided
    let filteredData = analytics;
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      filteredData = {
        ...analytics.toObject(),
        views: analytics.views.filter(view => 
          view.date >= start && view.date <= end
        ),
        interactions: analytics.interactions.filter(interaction => 
          interaction.date >= start && interaction.date <= end
        )
      };
    }

    res.json(filteredData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const recordBusinessView = async (req, res) => {
  try {
    const { businessId } = req.params;
    
    const analytics = await BusinessAnalytics.findOne({ businessId });
    if (!analytics) {
      return res.status(404).json({ message: 'Analytics not found' });
    }

    const now = new Date();
    analytics.views.push({
      date: now,
      count: 1
    });

    // Update popular times
    const dayOfWeek = now.toLocaleLowerCase();
    const hour = now.getHours();
    analytics.popularTimes[dayOfWeek][hour] += 1;

    await analytics.save();
    res.json({ message: 'View recorded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const recordInteraction = async (req, res) => {
  try {
    const { businessId } = req.params;
    const { type } = req.body;

    const analytics = await BusinessAnalytics.findOne({ businessId });
    if (!analytics) {
      return res.status(404).json({ message: 'Analytics not found' });
    }

    analytics.interactions.push({
      type,
      date: new Date()
    });

    await analytics.save();
    res.json({ message: 'Interaction recorded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};