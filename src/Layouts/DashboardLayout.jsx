import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  BaggageClaim,
  LogOut,
  Home,
  LayoutDashboard,
  ChevronRight,
  Menu,
} from "lucide-react";
import {
  MdHistoryEdu,
  MdDocumentScanner,
  MdAssignmentAdd,
} from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { TbHeartRateMonitor } from "react-icons/tb";
import { RiTodoFill } from "react-icons/ri";
import { GrDocumentUpdate } from "react-icons/gr";
import { PiCurrencyCircleDollarDuotone } from "react-icons/pi";
import toast from "react-hot-toast";

import useAuth from "../hooks/useAuth";
import useLoading from "../hooks/useLoading";
import useDefineRole from "../hooks/useDefineRole";
import Logo from "../components/Logo/Logo";

const DashLayout = () => {
  const { user, logOutUser } = useAuth();
  const { startLoading, stopLoading } = useLoading();
  const navigate = useNavigate();
  const { role } = useDefineRole();
  const location = useLocation();
  const getPathName = () => {
  const path = location.pathname;
  if (path.includes("payment-checkout")) {
    return "Payment Checkout";
  }
  const segment = path.split("/").pop()?.replace(/-/g, " ") || "Dashboard";
  return segment;
  };

const pathSegment = getPathName();

  const handleLogout = async () => {
    startLoading();
    try {
      await logOutUser();
      stopLoading();
      toast.success("Signed out securely");
      navigate("/");
    } catch (error) {
      stopLoading();
      toast.error("Logout failed");
    }
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
      isActive
        ? "bg-white text-primary shadow-lg shadow-black/10 font-bold"
        : "text-white/70 hover:bg-white/10 hover:text-white"
    }`;

  // REUSABLE NAVIGATION LINKS COMPONENT
  const NavItems = () => (
    <>
      <p className="text-[10px] uppercase font-black text-white/40 px-4 mb-2 tracking-widest mt-4">
        Main Menu
      </p>
      <NavLink to="/dashboard" end className={navLinkClass}>
        <Home size={20} />
        <span>Dashboard</span>
      </NavLink>
      <NavLink to="/dashboard/my-profile" className={navLinkClass}>
        <CgProfile size={22} />
        <span>My Profile</span>
      </NavLink>

      {/* User Section */}
      {role === "user" && (
        <>
          <p className="text-[10px] uppercase font-black text-white/40 px-4 pt-6 mb-2 tracking-widest">
            Client Portal
          </p>
          <NavLink to="/dashboard/my-bookings" className={navLinkClass}>
            <BaggageClaim size={20} />
            <span>My Bookings</span>
          </NavLink>
          <NavLink to="/dashboard/payment-history" className={navLinkClass}>
            <MdHistoryEdu size={22} />
            <span>Payment History</span>
          </NavLink>
        </>
      )}

      {/* Decorator Section */}
      {role === "decorator" && (
        <>
          <p className="text-[10px] uppercase font-black text-white/40 px-4 pt-6 mb-2 tracking-widest">
            Workspace
          </p>
          <NavLink
            to="/dashboard/my-assigned-projects"
            className={navLinkClass}
          >
            <RiTodoFill size={20} />
            <span>Assigned Projects</span>
          </NavLink>
          <NavLink
            to="/dashboard/update-project-status"
            className={navLinkClass}
          >
            <GrDocumentUpdate size={20} />
            <span>Project Status</span>
          </NavLink>
          <NavLink to="/dashboard/earnings-summary" className={navLinkClass}>
            <PiCurrencyCircleDollarDuotone size={22} />
            <span>Earnings</span>
          </NavLink>
        </>
      )}

      {/* Admin Section */}
      {role === "admin" && (
        <>
          <p className="text-[10px] uppercase font-black text-white/40 px-4 pt-6 mb-2 tracking-widest">
            Management
          </p>
          <NavLink
            to="/dashboard/decorators-management-system"
            className={navLinkClass}
          >
            <MdDocumentScanner size={22} />
            <span>Applications</span>
          </NavLink>
          <NavLink
            to="/dashboard/users-management-system"
            className={navLinkClass}
          >
            <FaUsersGear size={22} />
            <span>User Control</span>
          </NavLink>
          <NavLink to="/dashboard/assign-decorators" className={navLinkClass}>
            <MdAssignmentAdd size={22} />
            <span>Assign Orders</span>
          </NavLink>
          <NavLink to="/dashboard/revenue-monitor" className={navLinkClass}>
            <TbHeartRateMonitor size={22} />
            <span>Revenue Monitor</span>
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-slate-50">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* --- MAIN CONTENT --- */}
      <div className="drawer-content flex flex-col h-screen overflow-y-auto relative">
        <title>Style Decor | Dashboard</title>

        {/* Top Floating Navbar */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile Toggle Button */}
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-ghost btn-sm lg:hidden p-0 h-10 w-10 min-h-0"
            >
              <Menu size={24} />
            </label>

            <div className="flex items-center gap-2 text-slate-400 text-xs md:text-sm">
              <LayoutDashboard size={16} className="hidden sm:block" />
              <ChevronRight size={12} className="hidden sm:block" />
              <span className="text-slate-900 text-lg md:text-xl font-bold capitalize truncate max-w-[120px] md:max-w-none font-serif">
                {pathSegment}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-[10px] font-black opacity-40 uppercase">
                System Status
              </p>
              <p className="text-[10px] text-green-500 font-bold flex items-center justify-end gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Online
              </p>
            </div>
            {/* User Avatar Small (Mobile) */}
            <div className="avatar sm:hidden">
              <div className="w-8 h-8 rounded-full ring ring-primary ring-offset-2">
                <img
                  src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
                  alt="profile"
                  onError={(e) => {
                    e.target.src = "https://i.ibb.co/5GzXkwq/user.png";
                  }}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="p-2 md:p-4 lg:p-6 lg:pr-2 flex-1 w-full max-w-[100vw]">
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </main>

        {/* Simple Dashboard Footer */}
        <footer className="p-6 md:p-7 border-t border-slate-200 text-center text-slate-400 text-xs md:text-sm">
          &copy; {new Date().getFullYear()} Style Decor Admin.
        </footer>
      </div>

      {/* --- SIDEBAR DRAWER --- */}
      <div className="drawer-side z-[50]">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <aside className="w-72 min-h-full bg-primary text-white flex flex-col shadow-2xl">
          <div className="px-6 py-4">
            <Link to="/" className="inline-block">
              <Logo />
            </Link>
          </div>

          {/* User Quick Profile */}
          <div className="px-6 mb-6">
            <div className="bg-white/10 rounded-2xl p-4 flex items-center gap-3 border border-white/5">
              <div className="avatar">
                <div className="w-10 rounded-full ring ring-white/20 ring-offset-primary ring-offset-1">
                  <img
                    src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
                    alt="profile"
                    onError={(e) => {
                      e.target.src = "https://i.ibb.co/5GzXkwq/user.png";
                    }}
                  />
                </div>
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate">
                  {user?.displayName}
                </p>
                <p className="text-[9px] uppercase tracking-widest opacity-60 font-black">
                  {role}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Scroll Area */}
          <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
            <NavItems />
          </nav>

          {/* Footer Sidebar Logout */}
          <div className="p-4 mt-auto border-t border-white/10">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
            >
              <LogOut size={18} />
              <span className="font-bold text-sm">Sign Out</span>
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashLayout;
