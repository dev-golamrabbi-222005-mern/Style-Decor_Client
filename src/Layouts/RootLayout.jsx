import { Outlet } from "react-router";
import Navbar from "../pages/HOME/Home/Navbar/Navbar";
import Footer from "../pages/HOME/Home/Footer/Footer";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-linear-to-b from-purple-100 via-[#FCFAE0] to-purple-100">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
