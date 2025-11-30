import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const MyIssues = () => {
  const { t } = useTranslation();

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyIssues = async () => {
      try {
        const res = await axiosInstance.get("/crop/my-issues");
        setIssues(res.data.data || []);
      } catch (error) {
        console.error("Error fetching my issues:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyIssues();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        bg-[#0B1220]/80 backdrop-blur-lg
        p-5 sm:p-8 md:p-10
        rounded-2xl border border-cyan-500/30 shadow-lg
        w-full max-w-4xl md:max-w-5xl mx-auto
        text-white mb-16 sm:mb-20
      "
    >
      {/* Title */}
      <h2 className="
        text-2xl sm:text-3xl md:text-4xl
        text-cyan-400 font-semibold
        mb-4 sm:mb-6 text-center
      ">
        {t("mi_title")}
      </h2>

      {/* Loading */}
      {loading ? (
        <p className="text-center text-gray-400">{t("mi_loading")}</p>
      ) : issues.length === 0 ? (
        <p className="text-center text-gray-400 text-base sm:text-lg">
          {t("mi_no_issues")}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full text-gray-300 text-sm sm:text-base border-collapse">
            <thead>
              <tr className="bg-[#111827] text-cyan-400 text-xs sm:text-sm md:text-base">
                <th className="py-3 px-3 text-left">{t("mi_image")}</th>
                <th className="py-3 px-3 text-left">{t("mi_description")}</th>
                <th className="py-3 px-3 text-left">{t("mi_status")}</th>
                <th className="py-3 px-3 text-left">{t("mi_admin_response")}</th>
              </tr>
            </thead>

            <tbody>
              {issues.map((issue) => (
                <tr
                  key={issue._id}
                  className="
                    bg-[#1E293B] 
                    hover:bg-[#24324a]
                    transition-all border-b border-gray-700
                  "
                >
                  {/* IMAGE */}
                  <td className="py-3 px-3">
                    <img
                      src={issue.imageUrl}
                      alt="Issue"
                      className="
                        w-20 sm:w-28 md:w-32
                        h-16 sm:h-20 md:h-24
                        object-cover rounded-lg
                        border border-cyan-500/30
                      "
                    />
                  </td>

                  {/* DESCRIPTION */}
                  <td className="py-3 px-3 max-w-[200px] sm:max-w-[280px] overflow-hidden">
                    <p className="truncate">{issue.description}</p>
                  </td>

                  {/* STATUS */}
                  <td className="py-3 px-3">
                    <span
                      className={`
                        px-3 py-1 rounded-full text-xs sm:text-sm
                        font-medium whitespace-nowrap
                        ${
                          issue.status === "resolved"
                            ? "bg-green-600 text-white"
                            : "bg-yellow-600 text-white"
                        }
                      `}
                    >
                      {issue.status === "resolved"
                        ? t("mi_status_resolved")
                        : t("mi_status_pending")}
                    </span>
                  </td>

                  {/* ADMIN RESPONSE */}
                  <td className="py-3 px-3 text-gray-400 italic max-w-[200px] sm:max-w-[250px]">
                    <p className="truncate">
                      {issue.adminResponse || t("mi_no_response")}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default MyIssues;
