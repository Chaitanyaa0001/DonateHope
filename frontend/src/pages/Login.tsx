import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { Loader2 } from "lucide-react";
import Togglebutton from "@/components/ui/Togglebutton";
import { useCheckEmail, useRequestOTP, useAdminLogin } from "../hooks/auth/uselogin";
import { useDebounce } from "../hooks/auth/useDebounce";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Debounce email check
  const debouncedEmail = useDebounce(email, 700);

  const { data: emailCheck, isLoading: isChecking } = useCheckEmail(debouncedEmail);
  const requestOTPMutation = useRequestOTP();
  const adminLoginMutation = useAdminLogin();

  const isAdmin = emailCheck?.role === "admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isAdmin) {
        // Admin Login (password-based)
        const res = await adminLoginMutation.mutateAsync({ email, password });
        if (res?.message) {
          navigate("/verify", { state: { destination: email, role: "admin" } });
        }
      } else {
        // Normal user login or signup via OTP
        const res = await requestOTPMutation.mutateAsync({ email, fullName });
        if (res?.message) {
          navigate("/verify", { state: { destination: email, role: "user" } });
        }
      }
    } catch (err) {
      console.error("Error submitting:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f0f0] to-[#e2e2e2] dark:from-[#0f0c29] dark:via-[#302b63] dark:to-[#24243e] px-4">
      <div className="bg-white dark:bg-[#0e0d1f] p-8 rounded-2xl w-full max-w-md shadow-xl relative">
        <Togglebutton />

        <div className="flex justify-center mb-4">
          <div className="bg-purple-600 p-3 rounded-xl">
            <FiUser size={28} />
          </div>
        </div>

        <h2 className="text-center text-2xl font-bold mb-1">
          {isAdmin ? "Admin Login" : "Welcome to DonateHope"}
        </h2>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
          {isAdmin ? "Sign in with your password" : "Continue using OTP verification"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name (not required for admin) */}
          {!isAdmin && (
            <input
              type="text"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="w-full p-3 rounded-md bg-[#f0f0f0] dark:bg-[#15132b] border border-gray-300 dark:border-purple-500 placeholder-gray-500 dark:placeholder-gray-400 text-sm text-black dark:text-white"
              required
            />
          )}

          {/* Email Field */}
          <div className="relative">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 rounded-md bg-[#f0f0f0] dark:bg-[#15132b] border border-gray-300 dark:border-[#2e2b4f] placeholder-gray-500 dark:placeholder-gray-400 text-sm text-black dark:text-white"
              required
            />
            {isChecking && (
              <Loader2 className="absolute right-3 top-3.5 h-5 w-5 animate-spin text-purple-500" />
            )}
          </div>

          {/* Password (visible only if admin detected) */}
          {isAdmin && (
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full p-3 rounded-md bg-[#f0f0f0] dark:bg-[#15132b] border border-gray-300 dark:border-purple-500 placeholder-gray-500 dark:placeholder-gray-400 text-sm text-black dark:text-white"
              required
            />
          )}

          <button
            type="submit"
            disabled={adminLoginMutation.isPending || requestOTPMutation.isPending}
            className="w-full p-3 rounded-md font-semibold bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm hover:opacity-90 transition-all"
          >
            {adminLoginMutation.isPending || requestOTPMutation.isPending
              ? "Processing..."
              : isAdmin
              ? "Login"
              : "Continue with OTP"}
          </button>
        </form>

        {/* Debounce visual feedback */}
        {email && !isChecking && (
          <p
            className={`text-xs mt-3 text-center ${
              emailCheck
                ? emailCheck.role === "admin"
                  ? "text-purple-400"
                  : "text-green-500"
                : "text-gray-400"
            }`}
          >
            {emailCheck
              ? emailCheck.role === "admin"
                ? "Admin account detected"
                : "User account detected (OTP login)"
              : "Checking email..."}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
 