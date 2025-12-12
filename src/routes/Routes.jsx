import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home/Home';
import ErrorPage from '../pages/Error/ErrorPage';
import RootLayout from '../Layouts/RootLayout';



export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        index: true,
        Component: Home,
      },
    ]
  },
]);
