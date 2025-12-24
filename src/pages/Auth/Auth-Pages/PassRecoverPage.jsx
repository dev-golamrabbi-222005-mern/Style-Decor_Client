import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Mail,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  CheckCircle2,
} from "lucide-react";

const PassRecoverPage = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: Code verification, 3: Success
  const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmitEmail = async (data) => {
    // Simulate sending reset code
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // console.log("Sending reset code to:", data.email);

    setEmail(data.email);
    // Here you'll integrate with Firebase: sendPasswordResetEmail()
    // Example: await sendPasswordResetEmail(auth, data.email);

    setStep(2);
  };

  const onSubmitCode = async (data) => {
    // Simulate verifying code
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // console.log("Verifying code:", data.code);

    // Here you'll integrate with Firebase to verify the code
    // Firebase sends a reset link to email, so this step might be different

    setStep(3);
  };

  const handleResendCode = async () => {
    // console.log("Resending code to:", email);
    // Resend the password reset email
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4 relative">
      {/* Background Blur Overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/10" />

      {/* Forgot Password Card */}
      <div className="w-full max-w-md p-8 md:p-10 rounded-3xl shadow-2xl bg-white/10 border border-white/20 relative z-10">
        {/* Subtle Inner Glow */}
        <div className="absolute inset-0 bg-white/5 rounded-3xl" />

        <div className="relative z-10">
          {/* STEP 1: Email Input */}
          {step === 1 && (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sky-500/20 backdrop-blur-sm mb-4">
                  <Mail className="w-8 h-8 text-sky-300" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Forgot Password?
                </h2>
                <p className="text-white/80 text-sm md:text-base">
                  No worries! Enter your email and we'll send you a reset link
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmitEmail)}
                className="space-y-5"
              >
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
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Reset Link
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Back to Login */}
              <div className="mt-8 text-center">
                <Link
                  to="/auth/login"
                  className="inline-flex items-center gap-2 text-sky-300 hover:text-sky-100 transition duration-300 font-medium text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </Link>
              </div>
            </>
          )}

          {/* STEP 2: Code Verification */}
          {step === 2 && (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/20 backdrop-blur-sm mb-4">
                  <KeyRound className="w-8 h-8 text-purple-300" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Check Your Email
                </h2>
                <p className="text-white/80 text-sm md:text-base mb-2">
                  We've sent a password reset link to
                </p>
                <p className="text-sky-300 font-semibold text-sm md:text-base">
                  {email}
                </p>
              </div>

              {/* Info Box */}
              <div className="bg-sky-500/10 border border-sky-400/30 rounded-xl p-4 mb-6">
                <p className="text-white/90 text-sm leading-relaxed">
                  Click the link in your email to reset your password. The link
                  will expire in 1 hour.
                </p>
              </div>

              {/* Resend Button */}
              <button
                type="button"
                onClick={handleResendCode}
                className="
                  w-full py-3.5 rounded-xl 
                  bg-white/10 border border-white/20
                  text-white font-semibold 
                  hover:bg-white/20
                  transition-all duration-300
                  flex items-center justify-center gap-2
                "
              >
                <Mail className="w-5 h-5" />
                Resend Email
              </button>

              {/* Back Button */}
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    reset();
                  }}
                  className="inline-flex items-center gap-2 text-sky-300 hover:text-sky-100 transition duration-300 font-medium text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Try another email
                </button>
              </div>
            </>
          )}

          {/* STEP 3: Success Message */}
          {step === 3 && (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 backdrop-blur-sm mb-4 animate-bounce">
                  <CheckCircle2 className="w-10 h-10 text-green-300" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Password Reset!
                </h2>
                <p className="text-white/80 text-sm md:text-base">
                  Your password has been successfully reset
                </p>
              </div>

              {/* Success Message */}
              <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-4 mb-6">
                <p className="text-white/90 text-sm leading-relaxed text-center">
                  You can now log in with your new password
                </p>
              </div>

              {/* Login Button */}
              <Link
                to="/auth/login"
                className="
                  w-full py-3.5 rounded-xl 
                  bg-gradient-to-r from-green-500 to-emerald-600
                  text-white font-semibold text-lg 
                  shadow-lg shadow-green-500/30 
                  hover:shadow-xl hover:shadow-green-500/40
                  hover:from-green-600 hover:to-emerald-700
                  transition-all duration-300
                  flex items-center justify-center gap-2
                  group
                "
              >
                Go to Login
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PassRecoverPage;
