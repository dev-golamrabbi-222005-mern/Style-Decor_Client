import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff, User, Image, ArrowRight, Sparkles, Wrench } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import GoogleLogin from "./GoogleLogin";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("user");
  const navigate = useNavigate();
  const location = useLocation();
    const { registerUser, updateUserProfile, signInWithGoogle } = useAuth();

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

  const onSubmit = async (data) => {
    // Simulate API call
    // await new Promise((resolve) => setTimeout(resolve, 1500));
    // console.log("Register data:", data);
    // Handle registration logic here
    try{
        const result = await registerUser(data.email, data.password);
        console.log("user created", result);
        
        // Update user profile with name and photo
        await updateUserProfile({
            displayName: data.name,
            photoURL: data.photoURL
        });
        console.log('profile updated successfully');
        toast.success('You have successfully created an account on Style Decor.');
        navigate(location?.state || '/');
    }catch(error){
        console.log("registration error.", error);
    }
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4 relative">
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
            {/* Role Selection */}
            <div>
              <label className="block text-lg font-medium text-white/90 mb-3">
                I want to register as
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRole("user")}
                  className={`
                    relative p-4 rounded-xl border-2 transition-all duration-300
                    ${
                      selectedRole === "user"
                        ? "border-sky-400 bg-sky-500/20"
                        : "border-white/20 bg-white/5 hover:bg-white/10"
                    }
                  `}
                >
                  <input
                    type="radio"
                    value="user"
                    {...register("role")}
                    className="sr-only"
                    checked={selectedRole === "user"}
                    onChange={() => setSelectedRole("user")}
                  />
                  <div className="flex flex-col items-center gap-2">
                    <User
                      className={`w-8 h-8 ${
                        selectedRole === "user"
                          ? "text-sky-300"
                          : "text-white/60"
                      }`}
                    />
                    <span
                      className={`text-sm font-semibold ${
                        selectedRole === "user" ? "text-white" : "text-white/70"
                      }`}
                    >
                      Normal User
                    </span>
                  </div>
                  {selectedRole === "user" && (
                    <div className="absolute top-2 right-2 w-3 h-3 bg-sky-400 rounded-full" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole("decorator")}
                  className={`
                    relative p-4 rounded-xl border-2 transition-all duration-300
                    ${
                      selectedRole === "decorator"
                        ? "border-purple-400 bg-purple-500/20"
                        : "border-white/20 bg-white/5 hover:bg-white/10"
                    }
                  `}
                >
                  <input
                    type="radio"
                    value="decorator"
                    {...register("role")}
                    className="sr-only"
                    checked={selectedRole === "decorator"}
                    onChange={() => setSelectedRole("decorator")}
                  />
                  <div className="flex flex-col items-center gap-2">
                    <Wrench
                      className={`w-8 h-8 ${
                        selectedRole === "decorator"
                          ? "text-purple-300"
                          : "text-white/60"
                      }`}
                    />
                    <span
                      className={`text-sm font-semibold ${
                        selectedRole === "decorator"
                          ? "text-white"
                          : "text-white/70"
                      }`}
                    >
                      Decorator
                    </span>
                  </div>
                  {selectedRole === "decorator" && (
                    <div className="absolute top-2 right-2 w-3 h-3 bg-purple-400 rounded-full" />
                  )}
                </button>
              </div>
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

          {/* Social Login Button */}
          <GoogleLogin/>

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
