import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { motion } from "framer-motion";

const advantages = [
  "Gamified farming experience",
  "Track crop progress",
  "Learn eco-friendly techniques",
  "Smart insights for farmers",
  "Connect with community",
  "Optimize your yield",
  "Sustainable farming tips",
];

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY * 0.3);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e) => {
     e.preventDefault();
     setLoading(true);
     try {
       const res = await axios.post("/users/registerUser", {
         fullName,
         email,
         password,
         phoneNumber,
       });
       alert("OTP sent via WhatsApp! Please verify.");
       navigate("/verify-otp", { state: { userId: res.data.data._id } });
     } catch (err) {
       alert(err.response?.data?.message || "Registration failed");
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
      {/* Background */}
      <motion.img
        src="/images/Farmer.avif"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: `translateY(${scrollY}px)` }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>

      {/* Floating Advantages Text */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        {[...Array(15)].map((_, i) => {
          const startX = Math.random() * window.innerWidth;
          const startY = Math.random() * window.innerHeight;
          const size = Math.random() * 50 + 40;
          const duration = Math.random() * 25 + 20;
          const xDirection = Math.random() > 0.5 ? 1 : -1;

          return (
            <motion.div
              key={i}
              className="absolute bg-white/30 rounded-full flex items-center justify-center text-black font-semibold text-xs shadow-md px-3 py-1"
              initial={{ x: startX, y: startY, scale: size / 50 }}
              animate={{
                y: [-100, window.innerHeight + 100],
                x: [
                  startX,
                  startX + xDirection * (Math.random() * 200 + 50),
                  startX - xDirection * (Math.random() * 200 + 50),
                ],
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
            >
              {advantages[i % advantages.length]}
            </motion.div>
          );
        })}
      </div>

      {/* Sign Up Card */}
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
          Sign Up
        </h2>

        <form className="flex flex-col gap-3 sm:gap-4" onSubmit={handleSubmit}>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            value={fullName}
            placeholder="Full Name"
            onChange={(e) => setFullName(e.target.value)}
            required
            className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="number"
            value={phoneNumber}
            placeholder="Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="mt-3 sm:mt-4 px-4 py-2.5 sm:py-3 bg-lime-400 text-black font-semibold rounded-xl hover:bg-lime-500 transition-all duration-300"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </motion.button>
        </form>

        <p className="mt-3 sm:mt-4 text-center text-gray-700 text-sm font-poppins">
          Already have an account?{" "}
          <span
            className="text-lime-500 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </motion.div>
    </section>
  );
};

export default Register;
