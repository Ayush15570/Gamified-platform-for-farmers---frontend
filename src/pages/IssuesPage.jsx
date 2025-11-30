import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import ReportIssue from "../components/ReportIssue";
import MyIssues from "../components/MyIssues";
import { useTranslation } from "react-i18next";

const IssuesPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const res = await axios.get("/subscription/status");

        if (res.data.data.subscription === "free") {
          await Swal.fire({
            icon: "info",
            title: t("issues_vip_required_title"),
            html: `
              <p style="color:#ccc;">${t("issues_vip_required_msg1")}</p>
              <p style="color:#22c55e;">${t("issues_vip_required_msg2")}</p>
            `,
            confirmButtonText: t("issues_vip_upgrade_btn"),
            confirmButtonColor: "#22c55e",
            background: "#0f172a",
            color: "#fff",
          });

          navigate("/dashboard");
        }
      } catch (err) {
        console.error(err);
      }
    };

    checkSubscription();
  }, [navigate, t]);

  return (
    <div 
      className="
        min-h-screen 
        bg-gradient-to-b from-[#050A18] to-[#0B1220] 
        py-10 sm:py-16 
        px-4 sm:px-8
      "
    >
      {/* PAGE TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          text-3xl sm:text-4xl md:text-5xl 
          font-bold 
          text-center 
          text-cyan-400 
          mb-6 sm:mb-10
        "
      >
        {t("issues_title")}
      </motion.h1>

      {/* SUBTITLE 1 */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="
          max-w-2xl md:max-w-3xl 
          mx-auto 
          text-center 
          text-gray-400 
          text-base sm:text-lg 
          mb-2 sm:mb-3
        "
      >
        {t("issues_subtitle")}
      </motion.p>

      {/* SUBTITLE 2 */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="
          max-w-2xl md:max-w-3xl 
          mx-auto 
          text-center 
          text-gray-400 
          text-base sm:text-lg 
          mb-10 sm:mb-14
        "
      >
        {t("issues_subtitle2")}
      </motion.p>

      {/* REPORT ISSUE FORM */}
      <div className="w-full max-w-4xl mx-auto">
        <ReportIssue />
      </div>

      {/* USER'S ISSUES LIST */}
      <div className="w-full max-w-5xl mx-auto mt-10 sm:mt-12">
        <MyIssues />
      </div>
    </div>
  );
};

export default IssuesPage;
