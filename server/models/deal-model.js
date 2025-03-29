import mongoose from 'mongoose';

const dealSchema = new mongoose.Schema(
  {
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    discountType: {
      type: String,
      enum: ['percentage', 'fixed', 'bogo', 'special'],
      default: 'percentage',
    },
    discountValue: {
      type: Number,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isFlashDeal: {
      type: Boolean,
      default: false,
    },
    image: String,
    targetedUsers: {
      type: String,
      enum: ['all', 'new', 'returning', 'premium'],
      default: 'all',
    },
    category: String,
    impressions: {
      type: Number,
      default: 0,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    redemptions: {
      type: Number,
      default: 0,
    },
    promoCode: String,
    status: {
      type: String,
      enum: ['active', 'upcoming', 'expired', 'paused'],
      default: 'active',
    },
  },
  { timestamps: true }
);

const Deal = mongoose.model('Deal', dealSchema);

export default Deal;