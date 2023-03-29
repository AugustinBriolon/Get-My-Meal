import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import './index.css';

import Search from './pages/Search';
import Ingredient from './pages/Ingredient';
import Meals from './pages/Meals';
import Category from './pages/Category';
import Area from './pages/Area';


const router = createBrowserRouter([
  { path: "/", element: <Search/>},
  { path: "ingredient/:ingredient", element: <Ingredient/>  },
  { path: "/meal/:meal", element: <Meals/>  },
  { path: "/category/:category", element: <Category/>  },
  { path: "/area/:area", element: <Area/>  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);