import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout";
import ErrorPage from "../pages/Error/ErrorPage";
import Home from "../pages/HOME/Home/Home";
import Services from "../pages/Services/Services";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import AuthLayout from "../Layouts/AuthLayout";
import LoginPage from "../pages/Auth/Auth Pages/LoginPage";
import RegistrationPage from "../pages/Auth/Auth Pages/RegistrationPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "services", element: <Services /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout/>,
    children: [
      {path: 'auth/login', element: <LoginPage/>},
      {path: 'auth/register', element: <RegistrationPage/>},
      // {path: 'auth/login', element: <LoginPage/>}
    ]
  }
]);
