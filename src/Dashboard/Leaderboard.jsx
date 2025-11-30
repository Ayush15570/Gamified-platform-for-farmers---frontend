import React from "react";
import { motion } from "framer-motion";

const Leaderboard = ({ topUsers, currentUserId }) => {
  return (
    <section className="bg-[#0d1117] p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/10 backdrop-blur-lg">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-white tracking-wide">
        🏆 Leaderboard
      </h2>

      <div className="space-y-3 sm:space-y-4">
        {topUsers.map((user, index) => {
          const isCurrentUser = user._id === currentUserId;

          return (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`
                flex flex-col sm:flex-row sm:items-center sm:justify-between 
                px-4 sm:px-6 py-4 rounded-2xl border border-white/10 
                shadow-md transition-all duration-300 hover:scale-[1.02]
                ${isCurrentUser
                  ? "bg-gradient-to-r from-lime-400/30 to-lime-600/40 border-lime-400"
                  : "bg-white/5"
                }
              `}
            >
              {/* Left section */}
              <div className="flex items-center gap-3 sm:gap-4">
                <span
                  className={`text-lg sm:text-xl font-bold w-7 sm:w-8 text-center ${
                    index === 0
                      ? "text-yellow-400"
                      : index === 1
                      ? "text-gray-300"
                      : index === 2
                      ? "text-orange-400"
                      : "text-gray-400"
                  }`}
                >
                  {index + 1}
                </span>

                <div className="flex flex-col">
                  <span
                    className={`text-base sm:text-lg font-semibold truncate max-w-[180px] sm:max-w-none ${
                      isCurrentUser ? "text-lime-300" : "text-gray-200"
                    }`}
                  >
                    {user.fullName}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-400">
                    Rank #{index + 1}
                  </span>
                </div>
              </div>

              {/* Right section (XP) */}
              <div className="text-left sm:text-right mt-2 sm:mt-0">
                <span className="text-lime-400 font-bold text-base sm:text-lg whitespace-nowrap">
                  {user.totalPoints} XP
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Leaderboard;
