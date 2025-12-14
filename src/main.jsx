import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { router } from "./routes/Routes";
import { AuthProvider } from "./pages/Auth/Contexts/Auth-Context&Provider/AuthProvider";
import { LoadingProvider } from "./pages/Auth/Contexts/Loading-Context&Provider/LoadingProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadingProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </LoadingProvider>
    <ToastContainer position="top-right" autoClose={2000} />
    <Toaster position="top-right" toastOptions={{ duration: 2222 }} />
  </StrictMode>
);
