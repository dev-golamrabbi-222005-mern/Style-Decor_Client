import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLoading from "../hooks/useLoading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const {startLoading} = useLoading();

  if (loading) {
    return startLoading();
  }

  if (!user) {
    return <Navigate state={location.pathname} to="/auth/login"></Navigate>;
  }

  return children;
};

export default PrivateRoute;
