import React from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen flex justify-center items-center text-white px-6">
      <div className="bg-[#1E2B4A]/80 backdrop-blur-xl p-10 rounded-2xl shadow-2xl w-full max-w-lg border border-[#233554]">
        <h1 className="text-3xl font-semibold text-center mb-8">My Profile</h1>
        <div className="flex flex-col items-center space-y-5">
          <div className="avatar">
            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  user?.photoURL ||
                  "https://i.ibb.co/sV7GgVn/default-avatar.png"
                }
                alt="Profile"
              />
            </div>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold">
              {user?.displayName || "Unknown Gamer"}
            </h2>
            <p className="text-accent">{user?.email || "No email available"}</p>
          </div>

          <div className="divider"></div>

          <div className="w-full">
            <Link
              to="/dashboard/update-profile"
              className="btn w-full bg-primary text-black hover:bg-secondary font-semibold"
            >
              Update Information
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
