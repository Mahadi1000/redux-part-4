import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://660879baa2a5dd477b148346.mockapi.io',
  }),
  endpoints: () => ({}),
});
