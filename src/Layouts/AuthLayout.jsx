import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Auth_BG from "../assets/Auth_BG.png";

const AuthLayout = () => {
  return (
    <div>
      <Navbar />
      <div
        className="relative min-h-screen"
        style={{
          backgroundImage: `url(${Auth_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Background Blur Overlay */}
        <div className="absolute inset-0 backdrop-blur-sm bg-black/50 z-0" />

        {/* Content Container */}
        <div className="relative z-10">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
