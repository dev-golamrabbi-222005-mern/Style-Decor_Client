import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import GoogleLogin from "./GoogleLogin";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
    const {signInUser} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    // Simulate API call
    // await new Promise((resolve) => setTimeout(resolve, 1500));
    // console.log("Login data:", data);
    // Handle login logic here
    try {
      const result = await signInUser(data.email, data.password);
      console.log("sign in done", result);
      toast.success("You have successfully logged in to Style Decor.");
      navigate(location?.state || "/");
    } catch (error) {
      console.log("login error.", error);
    }

  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4 relative">
      <title>Style Decor | Login</title>
      
      {/* Login Card */}
      <div className="w-full max-w-xl my-10 p-8 md:p-10 rounded-3xl shadow-2xl bg-white/10 border border-white/20 relative z-10">
        {/* Subtle Inner Glow */}
        <div className="absolute inset-0 bg-white/5 rounded-3xl" />

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sky-500/20 backdrop-blur-sm mb-4">
              <Lock className="w-8 h-8 text-sky-300" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-white/80 text-sm md:text-base">
              Log in to manage your Style Decor bookings
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                      value: 6,
                      message: "Password must be at least 6 characters",
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="w-4 h-4 rounded border-white/20 bg-white/10 text-sky-500 focus:ring-2 focus:ring-sky-300 cursor-pointer"
                />
                <span className="ml-2 text-white/80 group-hover:text-white transition">
                  Remember me
                </span>
              </label>
              <Link
                to="/auth/recover-password"
                className="text-sky-300 hover:text-sky-100 transition duration-300 font-medium"
              >
                Forgot Password?
              </Link>
            </div>

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
                  Logging in...
                </>
              ) : (
                <>
                  Log In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
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

          {/* Social Login Buttons */}
          <GoogleLogin/>

          {/* Registration Link */}
          <p className="text-center text-sm text-white/80">
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              className="font-bold text-sky-300 hover:text-sky-100 transition duration-300"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
