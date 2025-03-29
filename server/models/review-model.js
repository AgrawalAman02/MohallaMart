import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    text: {
      type: String,
      required: true,
    },
    photos: [String],
    sentimentScore: {
      type: Number,
      default: 0, // -1 to 1 range, where -1 is very negative, 1 is very positive
    },
    keyPhrases: [String],
    likes: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['published', 'pending', 'rejected'],
      default: 'published',
    },
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;