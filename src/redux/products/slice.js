import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const productsApiSlice = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://619ad06d2782760017445317.mockapi.io/api/v1`,
  }),
  tagTypes: [`Products`],
  endpoints: builder => ({
    fetchProducts: builder.query({
      query: () => `/products`,
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: `Products`, id }))]
          : [`Products`],
    }),
    // transformResponse: response => response.data,
    addProduct: builder.mutation({
      query: product => ({
        url: `/products`,
        method: `POST`,
        body: product,
      }),
      invalidatesTags: [`Products`],
    }),
    removeProduct: builder.mutation({
      query: id => ({
        url: `/products/${id}`,
        method: `DELETE`,
      }),
      invalidatesTags: (result, error, id) => [{ type: `Products`, id }],
    }),
  }),
});
export const {
  useFetchProductsQuery,
  useAddProductMutation,
  useRemoveProductMutation,
} = productsApiSlice;
