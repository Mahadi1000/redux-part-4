import { IFormInput } from '@/pages/AddProduct';
import { IProduct } from '@/types/globalTypes';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  products: IProduct[];
  loading: boolean;
  status: boolean;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  status: true,
};
export const getAllProducts = createAsyncThunk(
  'productSlice/getAllPro',
  async () => {
    try {
      const response = await fetch(
        'https://660879baa2a5dd477b148346.mockapi.io/product'
      );
      const result = await response.json();
      return result;
    } catch (error) {
      return console.log(error);
    }
  }
);
export const createProduct = createAsyncThunk(
  'productSlice/createProduct',
  async (data : IFormInput) => {
    try {
      const res = await fetch(
        'https://660879baa2a5dd477b148346.mockapi.io/product',
        {
          method: 'POST',
          headers: {
            'content-type': ' application/json',
          },
          body: JSON.stringify(data),
        }
      );
      const result = await res.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  }
);
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProduct>) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllProducts.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });
    builder.addCase(createProduct.rejected, (state) => {
      state.loading = false;
    });
  },
});
export const { addProduct, removeProduct } = productSlice.actions;

export default productSlice.reducer;
