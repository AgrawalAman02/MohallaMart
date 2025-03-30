import mongoose from 'mongoose';

const timeSlotSchema = new mongoose.Schema({
  open: String,
  close: String
});

const businessHoursSchema = new mongoose.Schema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  monday: timeSlotSchema,
  tuesday: timeSlotSchema,
  wednesday: timeSlotSchema,
  thursday: timeSlotSchema,
  friday: timeSlotSchema,
  saturday: timeSlotSchema,
  sunday: timeSlotSchema,
  specialHours: [{
    date: Date,
    open: String,
    close: String,
    reason: String
  }]
});

const BusinessHours = mongoose.model('BusinessHours', businessHoursSchema);
export default BusinessHours;