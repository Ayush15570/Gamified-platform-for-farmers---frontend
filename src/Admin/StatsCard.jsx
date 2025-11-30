import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const StatsCard = ({ title, value = 0, color }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    let start = 0;
    const duration = 1200; // total animation time in ms
    const increment = value / (duration / 16); // approximate 60fps
    const counter = setInterval(() => {
      start += increment;
      if (start >= value) {
        start = value;
        clearInterval(counter);
      }
      setDisplayValue(Math.floor(start));
    }, 16);
    return () => clearInterval(counter);
  }, [value]);

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.03 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col justify-center items-center p-6 rounded-2xl shadow-lg 
                 bg-[#0A0F1F]/80 border border-cyan-400/30 
                 backdrop-blur-lg w-full text-center"
      style={{
        boxShadow: `0 0 20px ${color}50`,
      }}
    >
      <p className="text-gray-400 text-sm mb-1">{title}</p>

      <motion.h2
        key={value}
        className="text-3xl font-bold tracking-wide drop-shadow-[0_0_10px_#00FFFF]"
        style={{ color }}
        animate={controls}
      >
        {displayValue.toLocaleString()}
      </motion.h2>
    </motion.div>
  );
};

export default StatsCard;
