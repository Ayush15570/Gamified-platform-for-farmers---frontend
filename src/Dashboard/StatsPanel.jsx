import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const StatsPanel = ({ totalPoints, totalCompleted }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
    >
      {/* CARD 1 */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center">
        <h3 className="text-base sm:text-lg font-semibold text-gray-700">
          {t("total_points")}
        </h3>
        <p className="text-2xl sm:text-3xl font-bold text-lime-500 mt-1 sm:mt-2">
          {totalPoints}
        </p>
      </div>

      {/* CARD 2 */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center">
        <h3 className="text-base sm:text-lg font-semibold text-gray-700">
          {t("practices_completed")}
        </h3>
        <p className="text-2xl sm:text-3xl font-bold text-lime-500 mt-1 sm:mt-2">
          {totalCompleted}
        </p>
      </div>
    </motion.div>
  );
};

export default StatsPanel;
