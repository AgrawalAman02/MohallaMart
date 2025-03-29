import mongoose from 'mongoose';

const businessAnalyticsSchema = new mongoose.Schema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  views: [{
    date: Date,
    count: Number
  }],
  interactions: [{
    type: {
      type: String,
      enum: ['call', 'website', 'directions', 'message']
    },
    date: Date
  }],
  popularTimes: {
    monday: [Number],
    tuesday: [Number],
    wednesday: [Number],
    thursday: [Number],
    friday: [Number],
    saturday: [Number],
    sunday: [Number]
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const BusinessAnalytics = mongoose.model('BusinessAnalytics', businessAnalyticsSchema);
export default BusinessAnalytics;