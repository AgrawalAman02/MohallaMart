import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { useUpdateBusinessLocationMutation } from '@/api/businessApiSlice';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';

export function LocationPicker({ businessId, initialLocation, address }) {
  const [updateLocation] = useUpdateBusinessLocationMutation();
  const [location, setLocation] = useState(initialLocation || {
    coordinates: {
      type: 'Point',
      coordinates: [77.2090, 28.6139] // Default coordinates
    }
  });
  const [searchAddress, setSearchAddress] = useState(address?.street || '');
  const { toast } = useToast();
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

  const handleSearch = async () => {
    if (!searchAddress.trim()) return;
    
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchAddress)}.json?access_token=${mapboxToken}`
      );
      const data = await response.json();
      
      if (data.features?.[0]) {
        const [lng, lat] = data.features[0].center;
        setLocation({
          coordinates: {
            type: 'Point',
            coordinates: [lng, lat]
          }
        });
      } else {
        toast({
          title: 'Location not found',
          description: 'Try a different search term',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to find location',
        variant: 'destructive'
      });
    }
  };

  const handleSave = async () => {
    try {
      await updateLocation({
        businessId,
        location
      }).unwrap();
      
      toast({
        title: 'Success',
        description: 'Location updated successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update location',
        variant: 'destructive'
      });
    }
  };

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <div className="flex gap-2">
          <Input
            placeholder="Search address..."
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <div className="h-[400px] relative">
          {location.coordinates?.coordinates && (
            <MapContainer
              center={[
                location.coordinates.coordinates[1], 
                location.coordinates.coordinates[0]
              ]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <DraggableMarker
                position={[
                  location.coordinates.coordinates[1], 
                  location.coordinates.coordinates[0]
                ]}
                onDragEnd={(latlng) => {
                  setLocation({
                    coordinates: {
                      type: 'Point',
                      coordinates: [latlng.lng, latlng.lat]
                    }
                  });
                }}
              />
            </MapContainer>
          )}
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Location
        </Button>
      </CardContent>
    </Card>
  );
}

function DraggableMarker({ position, onDragEnd }) {
  return (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;
          const position = marker.getLatLng();
          onDragEnd(position);
        },
      }}
    />
  );
}