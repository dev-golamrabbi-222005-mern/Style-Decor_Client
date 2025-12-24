import React from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { updateUserProfile, setUser, user } = useAuth();

  const handleUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoUrl = e.target.photoURL.value;

    updateUserProfile({ displayName: name, photoURL: photoUrl })
      .then(() => {
        setUser({ ...user, displayName: name, photoURL: photoUrl });
        navigate("/dashboard/my-profile");
      })
      .catch((err) => {
        // console.log(err);
        setUser(user);
      });
    toast.success("Profile Updated Successfully!");
    navigate("/dashboard/my-profile");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0A192F] to-[#112240] text-white px-6">
      <div className="bg-[#1B2A4A] p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Update Your Information
        </h1>

        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block text-accent font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="input input-bordered w-full text-black bg-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-accent font-medium mb-2">
              Photo URL
            </label>
            <input
              type="text"
              name="photoURL"
              placeholder="Enter your photo URL"
              className="input input-bordered w-full text-black bg-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-full bg-primary text-accent font-semibold hover:bg-accent hover:text-black"
          >
            Update Information
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
