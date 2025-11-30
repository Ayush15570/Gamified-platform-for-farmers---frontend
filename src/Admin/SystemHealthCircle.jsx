import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const SystemHealthCircle = ({ health = 92 }) => {
  const [progress, setProgress] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ strokeDashoffset: 440 - (440 * health) / 100 });
    setProgress(health);
  }, [health]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-[#0A0F1F] border border-cyan-500/30 rounded-2xl p-4 shadow-lg flex flex-col items-center justify-center"
    >
      <h2 className="text-cyan-400 font-semibold text-lg mb-3">
        System Health
      </h2>

      <div className="relative w-40 h-40">
        {/* Background Circle */}
        <svg className="w-full h-full" viewBox="0 0 150 150">
          <circle
            cx="75"
            cy="75"
            r="70"
            stroke="#1E293B"
            strokeWidth="8"
            fill="none"
          />
          {/* Animated Progress Circle */}
          <motion.circle
            cx="75"
            cy="75"
            r="70"
            stroke="url(#grad)"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="440"
            initial={{ strokeDashoffset: 440 }}
            animate={controls}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ filter: "drop-shadow(0 0 10px #00FFFF)" }}
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00FFFF" />
              <stop offset="100%" stopColor="#00FF7F" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-3xl font-bold text-cyan-300">{progress}%</p>
          <p className="text-xs text-gray-400 mt-1">Performance</p>
        </div>
      </div>

      {/* Status label */}
      <p className="text-sm text-gray-400 mt-3">
        {progress > 90
          ? "Excellent 🌟"
          : progress > 70
          ? "Stable ⚙️"
          : "Needs Attention ⚠️"}
      </p>
    </motion.div>
  );
};

export default SystemHealthCircle;
