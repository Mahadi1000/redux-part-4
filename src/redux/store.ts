import { configureStore } from '@reduxjs/toolkit';
import CartSlice from './features/CartSlice';
import commentsSlice from './features/commentsSlice';
import productSlice from './features/productSlice';
import { api } from './api/apiSlice';
import userSlice from './features/userSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    cart: CartSlice,
    comments: commentsSlice,
    products: productSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
