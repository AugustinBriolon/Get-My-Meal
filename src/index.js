import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import './index.css';

import Home from './pages/Home';
import Ingredient from './pages/Ingredient';
import Meals from './pages/Meals';


const router = createBrowserRouter([
  { path: "/", element: <Home/>},
  { path: "/:ingredient", element: <Ingredient/>  },
  { path: "/meal/:meal", element: <Meals/>  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

