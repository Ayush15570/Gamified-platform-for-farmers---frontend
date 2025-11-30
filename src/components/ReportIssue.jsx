import React, { useState, useRef } from "react";
import axiosInstance from "../utils/axiosInstance";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const ReportIssue = () => {
  const { t } = useTranslation();

  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const textareaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || !image) {
      alert(t("ri_required"));
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("image", image);

    try {
      setLoading(true);
      await axiosInstance.post("/crop/report", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccessMsg("✅ " + t("ri_success"));
      setDescription("");
      setImage(null);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to submit issue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        bg-[#0B1220]/80 backdrop-blur-lg text-white
        p-5 sm:p-8 md:p-10
        rounded-2xl shadow-xl border border-cyan-500/30
        w-full max-w-3xl md:max-w-4xl mx-auto mb-10 sm:mb-12
      "
    >
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-cyan-400 mb-4 sm:mb-6 text-center">
        {t("ri_title")}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
        
        {/* Description */}
        <div className="flex flex-col">
          <label className="text-sm sm:text-base mb-1 text-gray-300">
            {t("ri_description_label")}
          </label>

          <textarea
            ref={textareaRef}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t("ri_description_placeholder")}
            rows="4"
            className="
              w-full p-3 sm:p-4 
              rounded-lg bg-[#1E293B] border border-gray-700 
              focus:outline-none focus:ring-2 focus:ring-cyan-500 
              text-gray-100 placeholder-gray-400
              text-sm sm:text-base
            "
          ></textarea>
        </div>

        {/* Image Upload */}
        <div className="flex flex-col">
          <label className="text-sm sm:text-base mb-1 text-gray-300">
            {t("ri_upload_label")}
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="
              w-full text-sm sm:text-base 
              p-2.5 sm:p-3 rounded-lg cursor-pointer
              bg-[#1E293B] border border-gray-700 text-gray-200
              focus:ring-2 focus:ring-cyan-500
            "
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="
            bg-gradient-to-r from-cyan-600 to-blue-500 
            hover:from-cyan-500 hover:to-blue-400 
            text-white py-2.5 sm:py-3 rounded-lg 
            text-base sm:text-lg font-semibold
            transition-all shadow-md hover:shadow-cyan-400/30
          "
        >
          {loading ? t("ri_submitting") : t("ri_submit")}
        </button>

        {successMsg && (
          <p className="text-green-400 text-center text-sm sm:text-lg mt-1">
            {successMsg}
          </p>
        )}
      </form>
    </motion.div>
  );
};

export default ReportIssue;
