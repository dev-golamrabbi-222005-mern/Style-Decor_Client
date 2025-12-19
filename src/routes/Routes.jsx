import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout";
import ErrorPage from "../pages/Error/ErrorPage";
import Home from "../pages/HOME/Home/Home";
import Services from "../pages/Services/Services";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import AuthLayout from "../Layouts/AuthLayout";
import LoginPage from "../pages/Auth/Auth-Pages/LoginPage";
import RegistrationPage from "../pages/Auth/Auth-Pages/RegistrationPage";
import PassRecoverPage from "../pages/Auth/Auth-Pages/PassRecoverPage";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import Packages from "../pages/Packages/Packages";
import Dashboard from "../pages/Dashboard/Dashboard";
import MyProfile from "../pages/Dashboard/My-Profile/MyProfile";
import UpdateProfile from "../pages/Dashboard/My-Profile/UpdateProfile";
import MyBookings from "../pages/Dashboard/My-Bookings/MyBookings";
import PaymentHistory from "../pages/Dashboard/Payment-History/PaymentHistory";
import PaymentPage from "../pages/Dashboard/Payment Page/PaymentPage";
import PaymentSuccess from "../pages/Dashboard/Payment Page/PaymentSuccess";
import PaymentFailure from "../pages/Dashboard/Payment Page/PaymentFailure";
import AdminRoute from "./AdminRoute";
import UsersManagement from "../pages/Dashboard/Users-Management/UsersManagement";
import DecoratorManagement from "../pages/Dashboard/Decorator-Management/DecoratorManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "services", element: <Services /> },
      { path: "packages", element: <Packages /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "auth/login", element: <LoginPage /> },
      { path: "auth/register", element: <RegistrationPage /> },
      { path: "auth/recover-password", element: <PassRecoverPage /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "my-profile", element: <MyProfile /> },
      { path: "update-profile", element: <UpdateProfile /> },
      { path: "my-bookings", element: <MyBookings /> },
      { path: "payment-history", element: <PaymentHistory /> },
      { path: "payment-checkout/:bookingId", element: <PaymentPage /> },
      { path: "payment-success", element: <PaymentSuccess /> },
      { path: "payment-cancelled", element: <PaymentFailure /> },
      {
        path: "users-management-system",
        element: (
            <AdminRoute>
              <UsersManagement />
            </AdminRoute>
        ),
      },
      {
        path: "decorators-management-system",
        element: (
            <AdminRoute>
              <DecoratorManagement />
            </AdminRoute>
        ),
      },
    ],
  },
]);
