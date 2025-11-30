import React, { useEffect, useState, useRef } from "react";
import axios from "../utils/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Achievements from "../Admin/Achievements";
import IncidentLog from "../Admin/IncidentLog";
import ResourceBarChart from "../Admin/ResourceBarChart";
import StatsCard from "../Admin/StatsCard";
import SystemHealthCircle from "../Admin/SystemHealthCircle";
import AdminPracticeManager from "../Admin/AdminPracticeManager";

import { Menu, LogOut, BarChart2, AlertTriangle } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const topRef = useRef(null);
  const issuesRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileSidebarOpen(false);
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      alert("Failed to fetch stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0A0F1F] text-[#00FFFF] text-xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen bg-[#0A0F1F] text-white font-poppins overflow-hidden">

      {/* ===========================
          DESKTOP SIDEBAR
      ============================ */}
      <motion.aside
        initial={{ width: sidebarOpen ? 230 : 70 }}
        animate={{ width: sidebarOpen ? 230 : 70 }}
        transition={{ duration: 0.25 }}
        className="
          hidden md:flex 
          fixed left-0 top-0 
          h-full z-20 
          bg-[#0D1B2A]/90 backdrop-blur-md text-[#00FFFF]
          flex-col justify-between
          shadow-[0_0_25px_#00FFFF50]
        "
      >
        <div>
          <div className="flex flex-col items-center py-6 border-b border-[#00FFFF40] text-center">
            <h1 className="text-2xl font-bold">🌾</h1>
            {sidebarOpen && (
              <>
                <h2 className="text-lg font-semibold mt-2">Admin</h2>
                <p className="text-xs opacity-75">{user?.username}</p>
              </>
            )}
          </div>

          <nav className="mt-6 flex flex-col gap-2 px-2">
            <button
              onClick={() => scrollToSection(topRef)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#00FFFF20] hover:bg-[#00FFFF30]"
            >
              <BarChart2 size={18} />
              {sidebarOpen && <span>Dashboard Overview</span>}
            </button>

            <button
              onClick={() => scrollToSection(issuesRef)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#00FFFF20]"
            >
              <AlertTriangle size={18} />
              {sidebarOpen && <span>Crop Issues</span>}
            </button>
          </nav>
        </div>

        <div className="px-3 py-4 border-t border-[#00FFFF40]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:bg-[#00FFFF20] text-[#FF4500]"
          >
            <LogOut size={18} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* ===========================
          MOBILE SIDEBAR
      ============================ */}
      {mobileSidebarOpen && (
        <motion.aside
          initial={{ x: -260 }}
          animate={{ x: 0 }}
          exit={{ x: -260 }}
          transition={{ duration: 0.25 }}
          className="
            fixed left-0 top-0 
            h-full w-60 z-30 
            bg-[#0D1B2A]/95 backdrop-blur-md 
            text-[#00FFFF] flex flex-col justify-between
            md:hidden shadow-[0_0_25px_#00FFFF50]
          "
        >
          <div>
            <div className="py-6 border-b border-[#00FFFF40] text-center">
              <h1 className="text-xl font-bold">Admin Control 🌾</h1>
              <p className="text-xs opacity-80 mt-1">{user?.username}</p>
            </div>

            <nav className="mt-6 flex flex-col gap-2 px-4">
              <button
                onClick={() => scrollToSection(topRef)}
                className="px-3 py-2 rounded-lg bg-[#00FFFF20]"
              >
                Dashboard Overview
              </button>

              <button
                onClick={() => scrollToSection(issuesRef)}
                className="px-3 py-2 rounded-lg hover:bg-[#00FFFF20]"
              >
                Crop Issues
              </button>
            </nav>
          </div>

          <div className="px-4 py-5 border-t border-[#00FFFF40]">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 rounded-lg w-full hover:bg-[#00FFFF20] text-[#FF4500]"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </motion.aside>
      )}

      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-10 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* ===========================
          SIDEBAR BUTTONS
      ============================ */}
      <div className="absolute top-4 left-4 z-30 flex gap-3">
        <button
          className="bg-[#00FFFF30] text-[#00FFFF] p-2 rounded-lg md:hidden"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        >
          <Menu size={20} />
        </button>

        <button
          className="hidden md:block bg-[#00FFFF20] text-[#00FFFF] p-2 rounded-lg hover:bg-[#00FFFF30]"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={18} />
        </button>
      </div>

      {/* ===========================
          MAIN CONTENT
      ============================ */}
      <main
        className={`
          flex-1 overflow-y-auto 
          py-10 px-4 md:px-8 transition-all duration-300
          ${sidebarOpen ? "md:ml-[230px]" : "md:ml-[70px]"}
        `}
      >
        <div ref={topRef} className="max-w-[1500px] mx-auto flex flex-col gap-14">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#00FFFF]">
              Admin Dashboard
            </h2>

            <p className="text-[#00FFFF90] text-sm md:text-base">
              System Overview
            </p>
          </motion.div>

          {/* TOP CARDS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            <SystemHealthCircle value={stats?.systemHealth || 0} />

            <StatsCard title="Total Users" value={stats?.totalUsers} color="#00FFFF" />

            <StatsCard title="Practices" value={stats?.totalPractices} color="#FF4500" />
          </motion.div>

          {/* MIDDLE SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          >
            <ResourceBarChart stats={stats} />
            <Achievements stats={stats} />
          </motion.div>

          {/* BOTTOM SECTION - ISSUES */}
          <motion.div
            ref={issuesRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-12"
          >
            {/* ISSUES LOG */}
            <section className="bg-[#0D1B2A]/80 backdrop-blur-md rounded-2xl p-5 sm:p-8 shadow-lg">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#00FFFF] mb-6 border-b border-[#00FFFF30] pb-2 text-center">
                Reported Issues
              </h3>

              <div className="w-full h-[60vh] sm:h-[65vh] overflow-auto rounded-lg">
                <IncidentLog />
              </div>
            </section>

            {/* PRACTICE MANAGER */}
            <section className="bg-[#0D1B2A]/80 backdrop-blur-md rounded-2xl p-5 sm:p-8 shadow-lg">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#00FFFF] mb-6 border-b border-[#00FFFF30] pb-2 text-center">
                User Practice Management
              </h3>

              <div className="w-full h-[60vh] sm:h-[65vh] overflow-auto rounded-lg">
                <AdminPracticeManager />
              </div>
            </section>
          </motion.div>

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
