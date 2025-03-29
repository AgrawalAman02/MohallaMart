import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import authRoutes from './routes/auth.routes.js';
import businessRoutes from './routes/business/businessRoutes.js';
import hoursRoutes from './routes/business/hoursRoutes.js';
import locationRoutes from './routes/business/locationRoutes.js';
import analyticsRoutes from './routes/business/analyticsRoutes.js';
import photosRoutes from './routes/business/photosRoutes.js';
// import dealRoutes from './routes/deal.routes.js';
// import reviewRoutes from './routes/review.routes.js';

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/businesses', businessRoutes);
app.use('/api/business-hours', hoursRoutes);
app.use('/api/business-locations', locationRoutes);
app.use('/api/business-analytics', analyticsRoutes);
app.use('/api/business-photos', photosRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/api/deals', dealRoutes);
// app.use('/api/reviews', reviewRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'MohallaMart API is running' });
});

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });