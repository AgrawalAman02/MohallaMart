import Business from '../../models/business-model.js';

export const uploadBusinessPhotos = async (req, res) => {
    try {
      const { id } = req.params;
      
      // Check if business exists and belongs to the user
      const business = await Business.findOne({ 
        _id: id, 
        owner: req.user._id 
      });
  
      if (!business) {
        return res.status(404).json({ message: 'Business not found' });
      }
  
      // Process the uploaded files
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No files uploaded' });
      }
  
      // Get the file paths - assuming uploads directory is served statically
      const photoPaths = req.files.map(file => `/uploads/${file.filename}`);
  
      // Update the business
      business.photos = [...(business.photos || []), ...photoPaths];
      
      await business.save();
      
      res.json({
        message: 'Photos uploaded successfully',
        photos: business.photos
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const setMainPhoto = async (req, res) => {
    try {
      const { id } = req.params;
      const { photoUrl } = req.body;
      
      // Check if business exists and belongs to the user
      const business = await Business.findOne({ 
        _id: id, 
        owner: req.user._id 
      });
  
      if (!business) {
        return res.status(404).json({ message: 'Business not found' });
      }
  
      business.mainPhoto = photoUrl;
      await business.save();
      
      res.json({
        message: 'Main photo updated successfully',
        mainPhoto: business.mainPhoto
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };