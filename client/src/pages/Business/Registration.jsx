import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { MapPin, Upload, Store } from 'lucide-react';
import { useCreateBusinessMutation } from '@/api/businessApiSlice';
import { useToast } from '@/hooks/use-toast';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function BusinessRegistrationForm() {
  const [createBusiness, { isLoading }] = useCreateBusinessMutation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState(null);

  const form = useForm({
    defaultValues: {
      name: '',
      category: '',
      description: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
      },
      contactInfo: {
        phone: '',
        email: '',
        website: '',
      },
      location: {
        coordinates: [0, 0], // [longitude, latitude]
      },
      businessHours: {
        monday: { open: '09:00', close: '17:00' },
        tuesday: { open: '09:00', close: '17:00' },
        wednesday: { open: '09:00', close: '17:00' },
        thursday: { open: '09:00', close: '17:00' },
        friday: { open: '09:00', close: '17:00' },
        saturday: { open: '09:00', close: '17:00' },
        sunday: { open: 'closed', close: 'closed' },
      },
      mainPhoto: null,
    },
  });

  const businessCategories = [
    'restaurant',
    'retail',
    'service',
    'cafe',
    'bakery',
    'grocery',
    'other',
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      form.setValue('mainPhoto', file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      console.log("Form data:", data); // Debug log
      
      // Make sure required fields are present
      if (!data.name || !data.category || !data.description) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields: name, category, and description.",
          variant: "destructive",
        });
        return;
      }
      
      // Build business data
      const businessData = {
        name: data.name,
        category: data.category,
        description: data.description,
        contactInfo: data.contactInfo || {},
        address: data.address || {},
        businessHours: data.businessHours || {},
        location: {
          type: 'Point',
          coordinates: data.location?.coordinates || [0, 0]
        }
      };
      
      // Create FormData and append data
      const formData = new FormData();
      
      // Add main photo if exists
      if (data.mainPhoto) {
        formData.append('mainPhoto', data.mainPhoto);
      }
      
      // Add other business data as JSON strings
      Object.keys(businessData).forEach(key => {
        if (businessData[key]) {
          if (typeof businessData[key] === 'object') {
            formData.append(key, JSON.stringify(businessData[key]));
          } else {
            formData.append(key, businessData[key]);
          }
        }
      });
      
      // Log what we're sending to the server
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      
      const result = await createBusiness(formData).unwrap();
      
      toast({
        title: "Success!",
        description: "Business registered successfully",
      });
      
      navigate(`/business/${result._id}`);
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Error",
        description: error.data?.message || "Failed to register business",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Register Your Business</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Business Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your business name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {businessCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your business..."
                      className="h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address */}
            <div className="space-y-4">
              <h3 className="font-medium">Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="address.street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP Code</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="font-medium">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="contactInfo.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactInfo.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactInfo.website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website (Optional)</FormLabel>
                      <FormControl>
                        <Input type="url" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <FormLabel>Business Photo</FormLabel>
              <div className="flex items-center gap-4">
                <label className="cursor-pointer">
                  <div className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
                <div className="text-sm text-muted-foreground">
                  Upload a main photo for your business
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Registering...' : 'Register Business'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}