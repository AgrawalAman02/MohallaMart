import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['user', 'business-owner', 'admin'],
      default: 'user',
    },
    profilePicture: {
      type: String,
      default: '',
    },
    location: {
      type: {
        type: String,
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0],
      },
    },
    savedBusinesses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business',
    }],
    preferences: {
      categories: [String],
      radius: {
        type: Number,
        default: 5, // in kilometers
      },
      notifications: {
        deals: {
          type: Boolean,
          default: true,
        },
        newBusinesses: {
          type: Boolean,
          default: true,
        },
      },
    },
    businesses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business',
    }],
  },
  { timestamps: true }
);

// Index for geospatial queries
userSchema.index({ location: '2dsphere' });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;