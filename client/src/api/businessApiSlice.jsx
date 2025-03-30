import { apiSlice } from './apiSlice';

export const businessApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all businesses for a business owner
    getBusinesses: builder.query({
      query: () => '/businesses/my-businesses',
      providesTags: ['Business'],
    }),

    getAllBusinesses: builder.query({
      query: (params) => ({
        url: '/businesses',
        params: {
          category: params?.category,
          page: params?.page || 1,
          limit: params?.limit || 12
        }
      }),
      providesTags: ['Businesses']
    }),
    
    // Get featured/trending businesses
    getFeaturedBusinesses: builder.query({
      query: () => '/businesses/featured',
      providesTags: ['FeaturedBusinesses']
    }),

    // Get businesses with active deals
    getBusinessesWithDeals: builder.query({
      query: () => '/businesses/with-deals',
      providesTags: ['BusinessDeals']
    }),

    // Get single business details
    getBusiness: builder.query({
      query: (id) => `/businesses/${id}`,
      providesTags: (result, error, id) => [{ type: 'Business', id }],
    }),

    // Create new business
    createBusiness: builder.mutation({
      query: (data) => {
        // Handle FormData for photo uploads
        if (data instanceof FormData) {
          return {
            url: '/businesses',
            method: 'POST',
            body: data,
            formData: true,
          };
        }
        
        return {
          url: '/businesses',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Business'],
    }),

    // Update business details
    updateBusiness: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/businesses/${id}`,
        method: 'PUT', 
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Business', id }],
    }),

    // Update business hours
    updateBusinessHours: builder.mutation({
      query: ({ businessId, hours }) => ({
        url: `/business-hours/${businessId}`,
        method: 'PUT',
        body: hours,
      }),
      invalidatesTags: (result, error, { businessId }) => [
        { type: 'Business', id: businessId },
      ],
    }),

    // Update business location
    updateBusinessLocation: builder.mutation({
      query: ({ businessId, location }) => ({
        url: `/business-locations/${businessId}`,
        method: 'PUT',
        body: location,
      }),
      invalidatesTags: (result, error, { businessId }) => [
        { type: 'Business', id: businessId },
      ],
    }),

    // Delete business
    deleteBusiness: builder.mutation({
      query: (id) => ({
        url: `/businesses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Business'],
    }),

    // Get business analytics
    getBusinessAnalytics: builder.query({
      query: ({ businessId, startDate, endDate }) => ({
        url: `/business-analytics/${businessId}`,
        params: { startDate, endDate },
      }),
      providesTags: (result, error, { businessId }) => [
        { type: 'BusinessAnalytics', id: businessId },
      ],
    }),

    // Upload business photos
    uploadBusinessPhotos: builder.mutation({
      query: ({ businessId, photos }) => {
        const formData = new FormData();
        
        if (Array.isArray(photos)) {
          photos.forEach(photo => {
            formData.append('photos', photo);
          });
        } else {
          formData.append('photos', photos);
        }
        
        return {
          url: `/business-photos/${businessId}/photos`,
          method: 'POST',
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: (result, error, { businessId }) => [
        { type: 'Business', id: businessId },
      ],
    }),

    // Set main photo
    setMainPhoto: builder.mutation({
      query: ({ businessId, photoUrl }) => ({
        url: `/business-photos/${businessId}/main-photo`,
        method: 'PUT',
        body: { photoUrl },
      }),
      invalidatesTags: (result, error, { businessId }) => [
        { type: 'Business', id: businessId },
      ],
    }),
  }),
});

export const {
  useGetBusinessesQuery,
  useGetBusinessQuery,
  useGetAllBusinessesQuery,
  useGetFeaturedBusinessesQuery,
  useGetBusinessesWithDealsQuery,
  useCreateBusinessMutation,
  useUpdateBusinessMutation,
  useUpdateBusinessHoursMutation,
  useUpdateBusinessLocationMutation,
  useDeleteBusinessMutation,
  useGetBusinessAnalyticsQuery,
  useUploadBusinessPhotosMutation,
  useSetMainPhotoMutation,
} = businessApiSlice;