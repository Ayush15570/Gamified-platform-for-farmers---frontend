import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import axios from "../utils/axiosInstance";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY * 0.3);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/users/login", {
        email,
        phoneNumber,
        password,
      });

      const userData = res.data.data.user;

      if (userData) {
        dispatch(login(userData));

        if (isAdmin) {
          if (userData.role === "admin") {
            navigate("/Admin-dashboard");
          } else {
            alert("❌ You are not an admin!");
          }
        } else {
          navigate("/dashboard");
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  const handleDemoLogin = async () => {
    try {
      const res = await axios.post("/users/demo-login");
      dispatch(login(res.data.data.user));
      navigate("/dashboard");
    } catch (err) {
      alert("Demo login failed");
    }
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="
          relative z-10 w-full 
          max-w-sm sm:max-w-md 
          bg-white/95 backdrop-blur-xl 
          rounded-2xl sm:rounded-3xl 
          shadow-xl 
          p-6 sm:p-8 
          mx-4
        "
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 text-center font-poppins">
          Login
        </h2>

        <form className="flex flex-col gap-3 sm:gap-4" onSubmit={handleSubmit}>
          <motion.input
            whileFocus={{
              scale: 1.02,
              boxShadow: "0px 0px 10px rgba(163, 230, 53, 0.4)",
            }}
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />

          <motion.input
            whileFocus={{
              scale: 1.02,
              boxShadow: "0px 0px 10px rgba(163, 230, 53, 0.4)",
            }}
            type="number"
            value={phoneNumber}
            placeholder="Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />

          <motion.input
            whileFocus={{
              scale: 1.02,
              boxShadow: "0px 0px 10px rgba(163, 230, 53, 0.4)",
            }}
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />

          {/* Admin Toggle */}
          <div className="flex items-center justify-center gap-2 mt-1 sm:mt-2">
            <label className="font-poppins text-gray-700 text-xs sm:text-sm">
              Login as Admin:
            </label>
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={() => setIsAdmin((prev) => !prev)}
              className="w-4 h-4 sm:w-5 sm:h-5 accent-lime-400 cursor-pointer"
            />
          </div>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 15px rgba(163, 230, 53, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="mt-3 sm:mt-4 px-4 py-2.5 sm:py-3 bg-lime-400 text-black font-semibold rounded-xl hover:bg-lime-500 transition-all duration-300 font-poppins"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        {/* DEMO LOGIN BUTTON */}
        <motion.button
          onClick={handleDemoLogin}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 12px rgba(251, 191, 36, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          className="mt-3 sm:mt-4 w-full px-4 py-2.5 sm:py-3 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-500 transition-all duration-300 font-poppins"
        >
          🚀 Login as Demo User
        </motion.button>

        <p className="mt-3 sm:mt-4 text-center text-gray-700 text-sm font-poppins">
          Don’t have an account?{" "}
          <span
            className="text-lime-500 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </motion.div>
    </section>
  );
};

export default Login;
