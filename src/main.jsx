import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { router } from "./routes/Routes";
import AuthProvider from "./pages/Auth/Contexts/Auth-Context&Provider/AuthProvider";
import LoadingProvider from "./pages/Auth/Contexts/Loading-Context&Provider/LoadingProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadingProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </LoadingProvider>
    <ToastContainer position="bottom-right" autoClose={2000} />
    <Toaster position="bottom-right" toastOptions={{ duration: 2222 }} />
  </StrictMode>
);
