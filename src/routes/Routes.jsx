import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from '../pages/Error/ErrorPage';
import RootLayout from '../Layouts/RootLayout';
import Home from '../pages/HOME/Home/Home';



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
