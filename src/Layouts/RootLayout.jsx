import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-linear-to-br from-blue-100 to-purple-100">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
