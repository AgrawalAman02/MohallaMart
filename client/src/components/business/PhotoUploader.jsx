import { useState } from 'react';
import { useUploadBusinessPhotosMutation } from '@/api/businessApiSlice';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, X, ImageIcon } from 'lucide-react';

export function PhotoUploader({ businessId, photos = [], mainPhoto }) {
  const [uploadedPhotos, setUploadedPhotos] = useState(photos);
  const [uploadedMainPhoto, setUploadedMainPhoto] = useState(mainPhoto);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadBusinessPhotos] = useUploadBusinessPhotosMutation();
  const { toast } = useToast();

  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    
    setIsUploading(true);
    
    try {
      const newPhotos = await Promise.all(
        files.map(file => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
          });
        })
      );
      
      // In a real implementation, you would upload the photos to the server
      setUploadedPhotos(prev => [...prev, ...newPhotos]);
      
      toast({
        title: 'Success',
        description: `${files.length} photos added to gallery`
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process photos',
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleMainPhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsUploading(true);
    
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedMainPhoto(reader.result);
        toast({
          title: 'Success',
          description: 'Main photo updated'
        });
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update main photo',
        variant: 'destructive'
      });
      setIsUploading(false);
    }
  };

  const handleRemovePhoto = (index) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      // In a real implementation, you would get the actual file objects
      // and upload them to the server
      await uploadBusinessPhotos({
        businessId,
        photos: uploadedPhotos,
        mainPhoto: uploadedMainPhoto
      }).unwrap();
      
      toast({
        title: 'Success',
        description: 'Photos saved successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save photos',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Photo */}
      <div>
        <h3 className="text-lg font-medium mb-4">Main Photo</h3>
        <div className="flex items-center gap-4">
          <div className="relative w-40 h-40">
            {uploadedMainPhoto ? (
              <div className="relative h-full w-full">
                <img
                  src={uploadedMainPhoto}
                  alt="Main"
                  className="w-full h-full object-cover rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6"
                  onClick={() => setUploadedMainPhoto(null)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <label className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                <span className="text-xs text-muted-foreground">Main Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleMainPhotoUpload}
                  disabled={isUploading}
                />
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Gallery Photos */}
      <div>
        <h3 className="text-lg font-medium mb-4">Photo Gallery</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {uploadedPhotos.map((photo, index) => (
            <Card key={index} className="relative group aspect-square">
              <img
                src={photo}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                onClick={() => handleRemovePhoto(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Card>
          ))}
          
          <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
            <span className="text-xs text-muted-foreground">Add Photos</span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handlePhotoUpload}
              disabled={isUploading}
            />
          </label>
        </div>
      </div>

      <Button onClick={handleSave} className="w-full" disabled={isUploading}>
        {isUploading ? 'Processing...' : 'Save Photos'}
      </Button>
    </div>
  );
}