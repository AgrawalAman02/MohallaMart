import Business from '../models/business.model.js';

export const searchBusinesses = async (req, res) => {
  try {
    const {
      query,       // Text search query
      lat, lng,    // User location coordinates
      radius = 5,  // Search radius in kilometers (default: 5km)
      category,    // Optional category filter
      minRating,   // Optional minimum rating filter
      hasDeals,    // Optional filter for businesses with active deals
      sortBy       // Optional sorting parameter (distance, rating, popularity)
    } = req.query;

    // Build query object
    const searchQuery = { status: 'active' };

    // Text search if query is provided
    if (query && query.trim()) {
      searchQuery.$text = { $search: query };
    }

    // Category filter
    if (category) {
      searchQuery.category = category;
    }

    // Rating filter
    if (minRating) {
      searchQuery.averageRating = { $gte: parseFloat(minRating) };
    }

    // Active deals filter
    if (hasDeals === 'true') {
      searchQuery.hasActiveDeals = true;
    }

    // Geospatial filter if coordinates are provided
    let geoNearStage = null;
    if (lat && lng) {
      const coordinates = [parseFloat(lng), parseFloat(lat)];
      
      // Convert radius to meters for MongoDB
      const radiusInMeters = parseFloat(radius) * 1000;
      
      geoNearStage = {
        $geoNear: {
          near: { type: 'Point', coordinates },
          distanceField: 'distance',
          maxDistance: radiusInMeters,
          spherical: true
        }
      };
    }

    // Build aggregation pipeline
    let pipeline = [];
    
    // Add geoNear stage if we have coordinates (must be first stage)
    if (geoNearStage) {
      pipeline.push(geoNearStage);
    }
    
    // Add match stage for filtering
    pipeline.push({ $match: searchQuery });
    
    // Add sorting stage
    if (sortBy) {
      switch (sortBy) {
        case 'rating':
          pipeline.push({ $sort: { averageRating: -1 } });
          break;
        case 'popularity':
          pipeline.push({ $sort: { reviewCount: -1 } });
          break;
        case 'distance':
          // Distance sorting is automatic when using $geoNear
          if (!geoNearStage) {
            pipeline.push({ $sort: { name: 1 } }); // Default to name if no geo
          }
          break;
        default:
          pipeline.push({ $sort: { name: 1 } });
      }
    } else if (geoNearStage) {
      // Default sort by distance if geo search is used
    } else {
      // Default sort by rating if no geo search
      pipeline.push({ $sort: { averageRating: -1 } });
    }
    
    // Add text score for relevance if using text search
    if (query && query.trim()) {
      pipeline = [
        { $match: { $text: { $search: query } } },
        { $addFields: { score: { $meta: "textScore" } } },
        ...pipeline.filter(stage => !stage.$match || !stage.$match.$text),
        { $sort: { score: -1 } }
      ];
    }
    
    // Add pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: limit });
    
    // Execute the query
    const businesses = await Business.aggregate(pipeline);
    
    // Get total count for pagination
    const countPipeline = [...pipeline];
    // Remove skip and limit for count
    countPipeline.pop(); // Remove limit
    countPipeline.pop(); // Remove skip
    countPipeline.push({ $count: 'totalCount' });
    
    const countResult = await Business.aggregate(countPipeline);
    const totalCount = countResult.length > 0 ? countResult[0].totalCount : 0;
    
    res.json({
      results: businesses,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Error performing search', error: error.message });
  }
};