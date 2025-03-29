import { apiSlice } from './apiSlice';

export const businessApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBusinesses: builder.query({
      query: ({ category, page = 1, limit = 10 } = {}) => {
        let url = `/businesses?page=${page}&limit=${limit}`;
        if (category) url += `&category=${category}`;
        return url;
      },
      providesTags: ['Business'],
    }),
    searchBusinesses: builder.query({
      query: ({ query, lat, lng, radius, category, page = 1, limit = 10 } = {}) => {
        let url = `/businesses/search?page=${page}&limit=${limit}`;
        if (query) url += `&q=${query}`;
        if (lat && lng) url += `&lat=${lat}&lng=${lng}`;
        if (radius) url += `&radius=${radius}`;
        if (category) url += `&category=${category}`;
        return url;
      },
      providesTags: ['Business'],
    }),
    getBusiness: builder.query({
      query: (id) => `/businesses/${id}`,
      providesTags: (result, error, id) => [{ type: 'Business', id }],
    }),
    createBusiness: builder.mutation({
      query: (businessData) => ({
        url: '/businesses',
        method: 'POST',
        body: businessData,
      }),
      invalidatesTags: ['Business'],
    }),
    updateBusiness: builder.mutation({
      query: ({ id, ...businessData }) => ({
        url: `/businesses/${id}`,
        method: 'PUT',
        body: businessData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Business', id }],
    }),
    deleteBusiness: builder.mutation({
      query: (id) => ({
        url: `/businesses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Business'],
    }),
  }),
});

export const {
  useGetBusinessesQuery,
  useSearchBusinessesQuery,
  useGetBusinessQuery,
  useCreateBusinessMutation,
  useUpdateBusinessMutation,
  useDeleteBusinessMutation,
} = businessApiSlice;