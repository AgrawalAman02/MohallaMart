import mongoose from 'mongoose';

const businessLocationSchema = new mongoose.Schema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  coordinates: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  landmark: String,
  serviceArea: {
    radius: Number,
    unit: {
      type: String,
      enum: ['km', 'mi'],
      default: 'km'
    }
  }
});

businessLocationSchema.index({ coordinates: '2dsphere' });

const BusinessLocation = mongoose.model('BusinessLocation', businessLocationSchema);
export default BusinessLocation;