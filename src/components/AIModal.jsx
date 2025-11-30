import AIReportIssue from "./AIReportIssue";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const AIModal = ({ isOpen, closeModal }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="
            fixed inset-0 bg-black/60 backdrop-blur-md 
            flex justify-center items-center 
            z-50 px-4
          "
        >
          {/* Modal Box */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="
              bg-[#0B1220] border border-cyan-500/40 
              rounded-2xl shadow-xl relative
              w-[95%] sm:w-[90%] md:w-[700px]
              max-h-[90vh] 
              flex flex-col
              pb-[max(0.5rem, env(safe-area-inset-bottom))]
            "
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="
                text-gray-300 hover:text-white 
                text-xl absolute top-3 right-3 
                p-2 rounded-full 
                bg-black/20 hover:bg-black/30
              "
              aria-label="Close AI Modal"
            >
              ✖
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto px-5 sm:px-6 py-6">
              <AIReportIssue />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIModal;
