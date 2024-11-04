import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import routes from './routes/routes.tsx';
import store from './redux/store.ts';
import {Provider} from "react-redux"
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store = {store} >
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>
);
