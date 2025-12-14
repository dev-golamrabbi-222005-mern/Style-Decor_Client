import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const AuthLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto py-11">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
