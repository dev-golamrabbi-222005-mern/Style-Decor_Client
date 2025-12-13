import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from '../pages/Error/ErrorPage';
import RootLayout from '../Layouts/RootLayout';
import Home from '../pages/HOME/Home/Home';
import Services from '../pages/Services/Services';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';



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
      {
        path: '/services',
        Component: Services
      },
      {
        path: '/about',
        Component: About,
      },
      {
        path: '/contact',
        Component: Contact
      }

    ]
  },
]);
