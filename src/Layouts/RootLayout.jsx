import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-linear-to-b from-purple-100 via-[#FFFCE8] to-purple-100">
        <div>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
