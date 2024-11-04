import { IProduct } from "@/types/globalTypes";
import { api } from "../api/apiSlice";


const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => '/product',
    }),
    singleProduct: builder.query({
      query: (id) => `/product/${id}`
    }),
    postProduct : builder.mutation<IProduct, Partial<IProduct> >({
       query: (newProduct) => ({
        url: `/product`,
        method: 'POST',
        body: newProduct
       })
    })
  }),
});

export const { useGetAllProductsQuery, usePostProductMutation, useSingleProductQuery } = productApi;