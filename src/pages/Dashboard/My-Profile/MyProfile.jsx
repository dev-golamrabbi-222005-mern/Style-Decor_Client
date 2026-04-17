import React from "react";
import { Link } from "react-router-dom";
import { Mail, ShieldCheck, User as UserIcon, Camera } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useDefineRole from "../../../hooks/useDefineRole";

const MyProfile = () => {
  const { user } = useAuth();
  const { role } = useDefineRole();

  return (
    // Lowered padding for mobile (px-4) vs desktop (gap-8)
    <div className="flex flex-col gap-6 md:gap-8 animate-fade-in pb-10">
      {/* Header Section */}
      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold font-serif text-gray-800">
          Account Settings
        </h1>
        <p className="text-sm md:text-base text-slate-500">
          Manage your personal information and profile visibility.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="h-20 md:h-24 bg-primary w-full relative">
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            </div>

            <div className="px-6 pb-8 -mt-10 md:-mt-12 flex flex-col items-center text-center">
              <div className="relative group">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full ring-4 ring-white shadow-lg overflow-hidden bg-slate-100">
                  <img
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/sV7GgVn/default-avatar.png"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md border border-slate-100 cursor-pointer">
                  <Camera size={14} className="md:size-4" />
                </label>
              </div>

              <h2 className="mt-4 text-lg md:text-xl font-bold text-slate-900 truncate max-w-full">
                {user?.displayName || "Member"}
              </h2>
              <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full mt-2">
                {role || "User"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Stats */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
            <h3 className="text-base md:text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <UserIcon size={18} className="text-primary" /> Personal
              Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Name Field */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="flex items-center gap-3 p-3 md:p-4 bg-slate-50 rounded-xl md:rounded-2xl border border-slate-100 overflow-hidden">
                  <UserIcon size={16} className="text-slate-400 shrink-0" />
                  <span className="font-medium text-slate-700 truncate text-sm md:text-base">
                    {user?.displayName || "Not set"}
                  </span>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="flex items-center gap-3 p-3 md:p-4 bg-slate-50 rounded-xl md:rounded-2xl border border-slate-100 overflow-hidden">
                  <Mail size={16} className="text-slate-400 shrink-0" />
                  <span className="font-medium text-slate-700 truncate text-sm md:text-base">
                    {user?.email || "Not set"}
                  </span>
                </div>
              </div>

              {/* Account Status */}
              <div className="space-y-1 md:col-span-2 lg:col-span-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  Account Status
                </label>
                <div className="flex items-center gap-3 p-3 md:p-4 bg-slate-50 rounded-xl md:rounded-2xl border border-slate-100">
                  <ShieldCheck size={16} className="text-green-500 shrink-0" />
                  <span className="font-medium text-slate-700 text-sm md:text-base">
                    Verified Member
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 md:mt-10 pt-6 border-t border-slate-100">
              <Link
                to="/dashboard/update-profile"
                className="btn btn-primary btn-md md:btn-lg rounded-xl md:rounded-2xl w-full md:w-auto px-10 shadow-lg shadow-primary/20 border-none normal-case"
              >
                Edit Profile Information
              </Link>
            </div>
          </div>

          {/* Security Section - Responsive Flex */}
          <div className="bg-indigo-900 rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-bold text-base md:text-lg">
                Keep your account secure
              </p>
              <p className="text-indigo-200 text-xs md:text-sm">
                Update password regularly.
              </p>
            </div>
            <Link
              to="/change-password"
              size="sm"
              className="btn btn-sm md:btn-md btn-ghost bg-white/10 hover:bg-white/20 border-none text-white w-full sm:w-auto"
            >
              Security
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
