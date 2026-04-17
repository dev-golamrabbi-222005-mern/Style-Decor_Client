import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { User, Image, ArrowLeft, Save } from "lucide-react";
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
        toast.success("Profile Updated Successfully!");
        navigate("/dashboard/my-profile");
      })
      .catch(() => {
        toast.error("Failed to update profile.");
      });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-6 md:gap-8 animate-fade-in pb-10">
      {/* Header Section - Responsive Flex */}
      <div className="flex flex-col-reverse w-full max-w-2xl gap-4 md:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl text-center md:text-left font-extrabold text-slate-900">
            Update Profile
          </h1>
          <p className="text-sm text-center md:text-base text-slate-500">
            Customize your dashboard experience.
          </p>
        </div>
        <button
          onClick={() => navigate("/dashboard/my-profile")}
          className="btn btn-sm md:btn-md btn-ghost gap-2 text-slate-500 hover:text-primary self-start sm:self-auto"
        >
          <ArrowLeft size={16} />{" "}
          <span className="text-xs md:text-sm font-bold">Back to Profile</span>
        </button>
      </div>

      <div className="w-full max-w-2xl mx-auto lg:mx-0">
        <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
          <form onSubmit={handleUpdate} className="space-y-4 md:space-y-6">
            {/* Name Field */}
            <div className="space-y-1 md:space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">
                Display Name
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  name="name"
                  defaultValue={user?.displayName}
                  placeholder="Full Name"
                  className="w-full pl-11 pr-4 py-3 md:py-4 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm md:text-base text-slate-700 font-medium"
                  required
                />
              </div>
            </div>

            {/* Photo URL Field */}
            <div className="space-y-1 md:space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">
                Photo URL
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                  <Image size={18} />
                </div>
                <input
                  type="text"
                  name="photoURL"
                  defaultValue={user?.photoURL}
                  placeholder="Image URL"
                  className="w-full pl-11 pr-4 py-3 md:py-4 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm md:text-base text-slate-700 font-medium"
                  required
                />
              </div>
            </div>

            {/* Form Actions - Full width on mobile */}
            <div className="pt-4 md:pt-6 flex flex-col sm:flex-row gap-3 md:gap-4">
              <button
                type="submit"
                className="btn btn-primary btn-md md:btn-lg rounded-xl md:rounded-2xl flex-1 shadow-lg shadow-primary/20 border-none normal-case gap-2 py-3 font-bold"
              >
                <Save size={18} /> Save Changes
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard/my-profile")}
                className="btn btn-ghost btn-md md:btn-lg rounded-xl md:rounded-2xl flex-1 normal-case text-slate-500 font-bold border border-slate-200 sm:border-none"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Pro Tip Card - Hidden on very small screens or made compact */}
        <div className="mt-6 md:mt-8 p-4 md:p-6 bg-blue-50 rounded-xl md:rounded-2xl border border-blue-100 flex gap-3 md:gap-4 items-start">
          <div className="p-2 bg-blue-500 rounded-lg text-white shrink-0">
            <Image size={16} />
          </div>
          <div>
            <p className="font-bold text-blue-900 text-[11px] md:text-sm">
              Pro Tip
            </p>
            <p className="text-blue-700 text-[10px] md:text-xs mt-0.5 leading-relaxed">
              Use square image links for the best experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
