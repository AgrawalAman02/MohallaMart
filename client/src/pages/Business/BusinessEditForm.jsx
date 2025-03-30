import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  useGetBusinessQuery,
  useUpdateBusinessMutation,
} from '@/api/businessApiSlice';
import { useToast } from '@/hooks/use-toast';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BusinessHoursEditor } from '@/components/business/BusinessHoursEditor';
import { LocationPicker } from '@/components/business/LocationPicker';
import { PhotoUploader } from '@/components/business/PhotoUploader';

export function BusinessEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: business, isLoading, isError } = useGetBusinessQuery(id);
  const [updateBusiness, { isLoading: isUpdating }] = useUpdateBusinessMutation();
  const { toast } = useToast();

  // Create form with react-hook-form
  const form = useForm({
    defaultValues: {
      name: '',
      category: '',
      description: '',
      contactInfo: {
        phone: '',
        email: '',
        website: ''
      }
    }
  });

  // Update form when data is loaded
  useEffect(() => {
    if (business) {
      form.reset({
        name: business.name,
        category: business.category,
        description: business.description,
        contactInfo: {
          phone: business.contactInfo?.phone || '',
          email: business.contactInfo?.email || '',
          website: business.contactInfo?.website || ''
        }
      });
    }
  }, [business, form]);

  const onSubmit = async (data) => {
    try {
      await updateBusiness({
        id,
        ...data
      }).unwrap();
      
      toast({
        title: 'Success',
        description: 'Business details updated successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.data?.message || 'Failed to update business details',
        variant: 'destructive'
      });
    }
  };

  if (isLoading) {
    return <div>Loading business details...</div>;
  }

  if (isError) {
    return <div>Error loading business. Please try again.</div>;
  }

  const categories = [
    'restaurant', 'retail', 'service', 'cafe', 'bakery', 'grocery', 'other'
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Business Profile</CardTitle>
        <CardDescription>Update your business information, hours, location, and photos</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Basic Details</TabsTrigger>
            <TabsTrigger value="hours">Business Hours</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map(category => (
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

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={4} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <Label>Contact Information</Label>
                  
                  <FormField
                    control={form.control}
                    name="contactInfo.phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" />
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
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isUpdating}>
                  {isUpdating ? 'Updating...' : 'Update Business Details'}
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="hours" className="py-4">
            <BusinessHoursEditor 
              businessId={id} 
              initialHours={business.businessHours} 
            />
          </TabsContent>

          <TabsContent value="location" className="py-4">
            <LocationPicker 
              businessId={id}
              initialLocation={business.location}
              address={business.address}
            />
          </TabsContent>

          <TabsContent value="photos" className="py-4">
            <PhotoUploader 
              businessId={id}
              photos={business.photos || []}
              mainPhoto={business.mainPhoto}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}