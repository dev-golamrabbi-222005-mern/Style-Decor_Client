import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Image,
  ArrowRight,
  Sparkles,
  Wrench,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import GoogleLogin from "./GoogleLogin";
import useLoading from "../../../hooks/useLoading";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { registerUser, updateUserProfile } = useAuth();
  const { startLoading, stopLoading } = useLoading();
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    defaultValues: {
      role: "user",
    },
  });
  const selectedRole = watch("role");

  const onSubmit = async (data) => {
    startLoading();
    try {
      const result = await registerUser(data.email, data.password);
      // Update user profile with name and photo
      await updateUserProfile({
        displayName: data.name,
        photoURL: data.photoUrl,
      });

      //Image processing
      const profileImg = data.photoUrl;
      const formData = new FormData();
      formData.append("image", profileImg);
      const img_API_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${
        import.meta.env.VITE_IMAGE_HOST_KEY
      }`;
      await axios.post(img_API_URL, formData).then(async (res) => {
        const photoURL = res.data.data.url;

        //create user in db
        if (data.role === "user") {
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
            role: data.role,
          };
          await axiosSecure.post("/users", userInfo);
          toast.success("Account created Successfully.!");
        }

        if (data.role === "decorator") {
          const decoratorApplication = {
            email: data.email,
            displayName: data.name,
            photoURL: data.photoUrl,
            role: data.role,
            experience: data.experience,
            applicationStatus: "pending",
            appliedAt: new Date(),
          };
          await axiosSecure.post("/decorators", decoratorApplication);
          toast.success("Account created! Application is pending review.");
        }

        navigate(location?.state || "/");
      });
    } catch (error) {
      setError(error?.message);
      // console.log("registration error.", error);
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 relative">
      {/* Register Card */}
      <div className="w-full max-w-xl p-8 md:p-10 rounded-3xl shadow-2xl bg-white/10 border border-white/20 relative z-10 my-8">
        {/* Subtle Inner Glow */}
        <div className="absolute inset-0 bg-white/5 rounded-3xl" />

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sky-500/20 backdrop-blur-sm mb-4">
              <Sparkles className="w-8 h-8 text-sky-300" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Create Account
            </h2>
            <p className="text-white/80 text-sm md:text-base">
              Join Style Decor and transform your space
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Role Selection Section */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-white/90">
                I want to register as a:
              </label>
              <div className="grid grid-cols-2 gap-4">
                {/* Home Owner Option */}
                <label
                  className={`
      relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300
      ${
        selectedRole === "user"
          ? "border-sky-400 bg-sky-400/20 ring-2 ring-sky-400/50 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
          : "border-white/10 bg-white/5 hover:bg-white/10"
      }
    `}
                >
                  <input
                    type="radio"
                    value="user"
                    {...register("role")}
                    className="hidden"
                  />
                  <User
                    className={`w-6 h-6 mb-1 ${
                      selectedRole === "user" ? "text-sky-300" : "text-white/50"
                    }`}
                  />
                  <span
                    className={`text-sm font-bold ${
                      selectedRole === "user" ? "text-white" : "text-white/60"
                    }`}
                  >
                    Home Owner
                  </span>
                  {selectedRole === "user" && (
                    <div className="absolute -top-2 -right-2 bg-sky-500 rounded-full p-1">
                      <ArrowRight className="w-3 h-3 text-white" />
                    </div>
                  )}
                </label>

                {/* Decorator Option */}
                <label
                  className={`
      relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300
      ${
        selectedRole === "decorator"
          ? "border-sky-400 bg-sky-400/20 ring-2 ring-sky-400/50 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
          : "border-white/10 bg-white/5 hover:bg-white/10"
      }
    `}
                >
                  <input
                    type="radio"
                    value="decorator"
                    {...register("role")}
                    className="hidden"
                  />
                  <Wrench
                    className={`w-6 h-6 mb-1 ${
                      selectedRole === "decorator"
                        ? "text-sky-300"
                        : "text-white/50"
                    }`}
                  />
                  <span
                    className={`text-sm font-bold ${
                      selectedRole === "decorator"
                        ? "text-white"
                        : "text-white/60"
                    }`}
                  >
                    Decorator
                  </span>
                  {selectedRole === "decorator" && (
                    <div className="absolute -top-2 -right-2 bg-sky-500 rounded-full p-1">
                      <ArrowRight className="w-3 h-3 text-white" />
                    </div>
                  )}
                </label>
              </div>

              {/* Dynamic Helper Text - Makes it clear what's happening */}
              <p className="text-xs text-center text-sky-200/70 italic mt-2">
                {selectedRole === "user"
                  ? "You'll be able to browse and book professional decorators."
                  : "You'll be applying to join our professional decorator team."}
              </p>
            </div>
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white/90 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  id="name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  placeholder="Your name here"
                  className={`
                    w-full pl-12 pr-4 py-3.5 rounded-xl 
                    bg-white/10 border ${
                      errors.name ? "border-red-400" : "border-white/20"
                    }
                    text-white placeholder-white/50 
                    focus:ring-2 focus:ring-sky-300 focus:border-sky-300 
                    transition duration-300 shadow-inner
                  `}
                />
              </div>
              {errors.name && (
                <p className="mt-1.5 text-sm text-red-300">
                  {errors.name.message}
                </p>
              )}
            </div>
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white/90 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="your.email@example.com"
                  className={`
                    w-full pl-12 pr-4 py-3.5 rounded-xl 
                    bg-white/10 border ${
                      errors.email ? "border-red-400" : "border-white/20"
                    }
                    text-white placeholder-white/50 
                    focus:ring-2 focus:ring-sky-300 focus:border-sky-300 
                    transition duration-300 shadow-inner
                  `}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-300">
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* Photo URL Input */}
            <div>
              <label
                htmlFor="photoUrl"
                className="block text-sm font-medium text-white/90 mb-2"
              >
                Photo URL
              </label>
              <div className="relative">
                <Image className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="url"
                  id="photoUrl"
                  {...register("photoUrl", {
                    required: "Photo URL is required",
                    pattern: {
                      value: /^https?:\/\/.+\..+/i,
                      message: "Please enter a valid URL",
                    },
                  })}
                  placeholder="https://example.com/photo.jpg"
                  className={`
                    w-full pl-12 pr-4 py-3.5 rounded-xl 
                    bg-white/10 border ${
                      errors.photoUrl ? "border-red-400" : "border-white/20"
                    }
                    text-white placeholder-white/50 
                    focus:ring-2 focus:ring-sky-300 focus:border-sky-300 
                    transition duration-300 shadow-inner
                  `}
                />
              </div>
              {errors.photoUrl && (
                <p className="mt-1.5 text-sm text-red-300">
                  {errors.photoUrl.message}
                </p>
              )}
            </div>
            {selectedRole === "decorator" && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Years of Experience
                </label>
                <div className="relative">
                  <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="number"
                    {...register("experience", {
                      required: selectedRole === "decorator",
                    })}
                    placeholder="How many years have you been decorating?"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-sky-300"
                  />
                </div>
              </div>
            )}
            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white/90 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/,
                      message:
                        "Password must include uppercase, lowercase, number & special character",
                    },
                  })}
                  placeholder="••••••••"
                  className={`
                    w-full pl-12 pr-12 py-3.5 rounded-xl 
                    bg-white/10 border ${
                      errors.password ? "border-red-400" : "border-white/20"
                    }
                    text-white placeholder-white/50 
                    focus:ring-2 focus:ring-sky-300 focus:border-sky-300 
                    transition duration-300 shadow-inner
                  `}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-300">
                  {errors.password.message}
                </p>
              )}
            </div>
            {/* Terms and Conditions */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                {...register("terms", {
                  required: "You must accept the terms and conditions",
                })}
                className="w-4 h-4 mt-0.5 rounded border-white/20 bg-white/10 text-sky-500 focus:ring-2 focus:ring-sky-300 cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-white/80">
                I agree to the{" "}
                <a
                  href="#terms"
                  className="text-sky-300 hover:text-sky-100 font-medium"
                >
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a
                  href="#privacy"
                  className="text-sky-300 hover:text-sky-100 font-medium"
                >
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-300 -mt-3">
                {errors.terms.message}
              </p>
            )}
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full py-3.5 rounded-xl 
                bg-gradient-to-r from-sky-500 to-blue-600
                text-white font-semibold text-lg 
                shadow-lg shadow-sky-500/30 
                hover:shadow-xl hover:shadow-sky-500/40
                hover:from-sky-600 hover:to-blue-700
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-300
                flex items-center justify-center gap-2
                group
              "
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            <p className="text-red-500 font-semibold ">{error}</p>{" "}
            <p className="text-red-500 font-semibold ">{error}</p>
          </form>

          {/* Divider & Social Login Button */}
          {selectedRole === "user" && (
            <>
              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/5 text-white/60 rounded-full">
                    or continue with
                  </span>
                </div>
              </div>
              <GoogleLogin />
            </>
          )}

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-white/80">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="font-bold text-sky-300 hover:text-sky-100 transition duration-300"
            >
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
