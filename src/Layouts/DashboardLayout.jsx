import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { BaggageClaim } from "lucide-react";
import { MdHistoryEdu } from "react-icons/md";
import { MdDocumentScanner } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import Footer from "../components/Footer/Footer";
import useAuth from "../hooks/useAuth";
import useLoading from "../hooks/useLoading";
import toast from "react-hot-toast";
import { MdAssignmentAdd } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { TbHeartRateMonitor } from "react-icons/tb";
import { RiTodoFill } from "react-icons/ri";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { GrDocumentUpdate } from "react-icons/gr";
import { PiCurrencyCircleDollarDuotone } from "react-icons/pi";


const DashLayout = () => {
  const {user, logOutUser} = useAuth();
  const {startLoading, stopLoading} = useLoading();
  const navigate = useNavigate();

  const handleLogout = async()=>{
    startLoading();
    try{
      const result = await logOutUser();
      console.log(result);
      stopLoading();
      toast.success('Log Out Successful.');
      navigate('/');
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div>
      <title>Style Decor | Dashboard</title>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-primary text-white">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-5"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="navbar-start px-4">Dashboard</div>
            {user && (
              <div className="navbar-end">
                <button
                  onClick={handleLogout}
                  className="btn bg-white text-black mr-3 md:mr-8 lg:mr-15"
                >
                  Sign Out
                </button>
              </div>
            )}
          </nav>
          {/* Page content here */}
          <div className="p-4">
            <Outlet />
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start is-drawer-close:w-14 is-drawer-open:w-64 bg-primary text-white">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
              {/* List item */}
              <li>
                <Link
                  to="/"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  {/* Home icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-5"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                  <span className="is-drawer-close:hidden">Homepage</span>
                </Link>
              </li>

              {/* Our Dashboard Links */}
              {/* Users Dash  */}
              <li>
                <NavLink
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My Profile"
                  to="/dashboard/my-profile"
                >
                  <CgProfile className="text-2xl -ml-0.5 my-3" />
                  <span className="is-drawer-close:hidden"> My Profile</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My Bookings"
                  to="/dashboard/my-bookings"
                >
                  <BaggageClaim className="-ml-1 my-3" />
                  <span className="is-drawer-close:hidden"> My Bookings</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Payment History"
                  to="/dashboard/payment-history"
                >
                  <MdHistoryEdu className="text-3xl -ml-2 my-3" />
                  <span className="is-drawer-close:hidden">
                    {" "}
                    Payment History
                  </span>
                </NavLink>
              </li>

              {/* Decorators Dash  */}
              <li>
                <NavLink
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My Assigned Projects"
                  to="/dashboard/my-assigned-projects"
                >
                  <RiTodoFill className="text-2xl -ml-1 my-3" />
                  <span className="is-drawer-close:hidden">
                    {" "}
                    My Assigned Projects
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Today's Schedule"
                  to="/dashboard/today-schedule"
                >
                  <RiCalendarScheduleFill className="text-2xl -ml-1 my-3" />
                  <span className="is-drawer-close:hidden">
                    {" "}
                    Today's Schedule
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Update Project Status"
                  to="/dashboard/update-project-status"
                >
                  <GrDocumentUpdate className="text-2xl -ml-1 my-3" />
                  <span className="is-drawer-close:hidden">
                    {" "}
                    Update Project Status
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Earnings Summary"
                  to="/dashboard/earnings-summary"
                >
                  <PiCurrencyCircleDollarDuotone className="text-2xl -ml-1 my-3" />
                  <span className="is-drawer-close:hidden">
                    {" "}
                    Earnings Summary
                  </span>
                </NavLink>
              </li>

              {/* Admin Dash  */}
              <li>
                <NavLink
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Decorators Applications"
                  to="/dashboard/decorators-applications"
                >
                  <MdDocumentScanner className="text-2xl -ml-1 my-3" />
                  <span className="is-drawer-close:hidden">
                    {" "}
                    Decorators Applications
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="All Users"
                  to="/dashboard/users-management-system"
                >
                  <FaUsersGear className="text-2xl -ml-1 my-3" />
                  <span className="is-drawer-close:hidden"> All Users</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Assign Decorators"
                  to="/dashboard/assign-decorators"
                >
                  <MdAssignmentAdd className="text-2xl -ml-1 my-3" />
                  <span className="is-drawer-close:hidden">
                    Assign Decorators
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Revenue Monitor"
                  to="/dashboard/revenue-monitor"
                >
                  <TbHeartRateMonitor className="text-2xl -ml-1 my-3" />
                  <span className="is-drawer-close:hidden">
                    Revenue Monitor
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashLayout;
