import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const WelcomeCard = ({ user, rank }) => {
  const { t } = useTranslation();

  const totalXP = user?.totalPoints || 0;

  // Level calculation logic
  let level = 1;
  if (totalXP >= 100 && totalXP < 300) level = 2;
  else if (totalXP >= 300 && totalXP < 600) level = 3;
  else if (totalXP >= 600 && totalXP < 1000) level = 4;
  else if (totalXP >= 1000) level = 5;

  const xpForNextLevel = level * 100;
  const currentLevelXP = (level - 1) * 100;
  const progress = Math.min(
    ((totalXP - currentLevelXP) / (xpForNextLevel - currentLevelXP)) * 100,
    100
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col md:flex-row items-center justify-between 
      bg-[#0d1117]/90 border border-white/10 rounded-3xl p-8 shadow-2xl 
      text-white backdrop-blur-xl"
    >
      {/* Left: Welcome + Rank Info */}
      <div>
        <h1 className="text-3xl font-bold text-lime-400">
          {t("welcome_user", { name: user?.fullName || "User" })}
        </h1>
        <p className="mt-2 text-gray-300 text-lg">
          {t("current_rank", {
            rank: `#${rank?.rank || "-"}`,
            total: rank?.totalUsers || "-",
          })}
        </p>
        <p className="mt-1 text-gray-400 text-sm tracking-wide">
          {t("motivation_message")}
        </p>
      </div>

      {/* Right: XP Progress Ring */}
      <div className="relative w-44 h-44 mt-8 md:mt-0 flex items-center justify-center">
        <svg className="absolute w-full h-full transform -rotate-90">
          <circle
            cx="88"
            cy="88"
            r="60"
            stroke="#1e293b"
            strokeWidth="10"
            fill="none"
          />
          <motion.circle
            cx="88"
            cy="88"
            r="60"
            stroke="url(#grad)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="377"
            strokeDashoffset={377 - (377 * progress) / 100}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#84cc16" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>

        {/* Centered Text */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">
            {Math.round(progress)}%
          </span>
          <span className="text-sm text-gray-400 mt-1">
            {t("level_label", { level })}
          </span>
        </div>
      </div>

      {/* XP Info */}
      <div className="text-center mt-4 text-sm text-gray-400">
        {totalXP - currentLevelXP} / {xpForNextLevel - currentLevelXP} XP
      </div>
    </motion.div>
  );
};

export default WelcomeCard;
