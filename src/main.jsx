import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { router } from "./routes/Routes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer position="top-right" autoClose={2000} />
    <Toaster position="top-right" toastOptions={{ duration: 2222 }} />
  </StrictMode>
);
