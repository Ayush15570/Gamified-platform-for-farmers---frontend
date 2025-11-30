import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { motion } from "framer-motion";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  const userId = location.state?.userId;

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY * 0.3);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/users/verify-phone", { userId, otp });
      alert("✅ Phone verified! You can now log in.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "❌ Invalid OTP");
    }

    setLoading(false);
  };

  return (
    <section
      className="
        relative min-h-screen w-full 
        overflow-hidden flex items-center justify-center 
        text-white px-4 sm:px-6
      "
    >
      {/* Background Image */}
      <motion.img
        src="/images/Farmer.avif"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: `translateY(${scrollY}px)` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>

      {/* OTP Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="
          relative z-10 w-full 
          max-w-sm sm:max-w-md 
          bg-white/90 backdrop-blur-md 
          rounded-2xl sm:rounded-3xl 
          shadow-xl 
          p-6 sm:p-8 
          mx-4
        "
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 text-center font-poppins">
          Verify OTP
        </h2>

        <form className="flex flex-col gap-3 sm:gap-4" onSubmit={handleVerify}>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="number"
            value={otp}
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
            required
            className="
              px-3 sm:px-4 
              py-2.5 sm:py-3 
              rounded-xl 
              border border-gray-300 
              text-black placeholder-gray-500 
              focus:outline-none focus:ring-2 focus:ring-lime-400
            "
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="
              mt-3 sm:mt-4 
              px-4 py-2.5 sm:py-3 
              bg-lime-400 text-black 
              font-semibold rounded-xl 
              hover:bg-lime-500 transition-all duration-300 font-poppins
            "
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </motion.button>
        </form>

        <p className="mt-3 sm:mt-4 text-center text-gray-700 text-sm font-poppins">
          Didn’t receive OTP?{" "}
          <span
            className="text-lime-500 font-semibold cursor-pointer hover:underline"
            onClick={() => alert("Please check your WhatsApp or try again.")}
          >
            Resend
          </span>
        </p>
      </motion.div>
    </section>
  );
};

export default VerifyOtp;
