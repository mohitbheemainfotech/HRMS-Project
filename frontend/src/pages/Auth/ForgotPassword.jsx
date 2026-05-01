import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      return setError("Email is required");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/auth/send-otp",
        { email }
      );

      setSuccess("OTP sent to your Gmail 📧");

      // 👉 next page (OTP verify)
      setTimeout(() => {
        navigate("/verify-otp", { state: { email } });
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/30 shadow-2xl rounded-3xl p-6 sm:p-8">

        <h2 className="text-3xl font-bold text-center text-white mb-4">
          Forgot Password 🔐
        </h2>

        {error && (
          <p className="bg-red-500/50 text-white p-2 rounded mb-3 text-sm text-center">
            {error}
          </p>
        )}

        {success && (
          <p className="bg-green-500/30 text-white p-2 rounded mb-3 text-sm text-center">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/30 text-white p-2 rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-purple-600 p-2 rounded-lg"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>

        </form>

        <p className="text-center text-white text-sm mt-4">
          <span
            onClick={() => navigate("/login")}
            className="underline cursor-pointer"
          >
            Back to Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default ForgotPassword;