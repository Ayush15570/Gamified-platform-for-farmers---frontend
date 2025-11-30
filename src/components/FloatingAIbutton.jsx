import React from "react";
import { motion } from "framer-motion";

const FloatingAIButton = ({ openModal }) => {
  return (
    <motion.button
      onClick={openModal}
      aria-label="Open AI Assistant"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="
        fixed 
        bottom-6 right-6 
        sm:bottom-8 sm:right-8
        bg-cyan-500 hover:bg-cyan-400 
        text-white p-4 rounded-full 
        shadow-xl shadow-cyan-500/40 
        text-2xl transition-all 
        z-50 
        backdrop-blur-md
        active:shadow-none
        // Safe area for iPhones
        pb-[max(1rem,env(safe-area-inset-bottom))]
      "
    >
      🤖
    </motion.button>
  );
};

export default FloatingAIButton;
