import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['restaurant', 'retail', 'service', 'cafe', 'bakery', 'grocery', 'other'],
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    location: {
      type: {
        type: String,
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    contact: {
      phone: String,
      email: String,
      website: String,
    },
    businessHours: {
      monday: { open: String, close: String },
      tuesday: { open: String, close: String },
      wednesday: { open: String, close: String },
      thursday: { open: String, close: String },
      friday: { open: String, close: String },
      saturday: { open: String, close: String },
      sunday: { open: String, close: String },
    },
    photos: [String],
    mainPhoto: String,
    averageRating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    keywords: [String],
    activeDeals: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Deal',
    }],
    verified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'pending'],
      default: 'active',
    },
  },
  { timestamps: true }
);

// Create index for geospatial queries
businessSchema.index({ location: '2dsphere' });
// Create text index for search functionality
businessSchema.index({ name: 'text', description: 'text', keywords: 'text' });

const Business = mongoose.model('Business', businessSchema);

export default Business;