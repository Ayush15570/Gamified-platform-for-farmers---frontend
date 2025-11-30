import React, { useState, useRef } from "react";
import axiosInstance from "../utils/axiosInstance";
import { motion } from "framer-motion";

const AIReportIssue = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  const textareaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || !image) {
      alert("Please provide both description and image!");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("image", image);

    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/ai/ai-crop-issue", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAiResult(data.data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to analyze issue");
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
        w-full max-w-3xl md:max-w-4xl mx-auto mb-12
      "
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-cyan-400 mb-4 sm:mb-6 text-center">
        AI Crop Analysis
      </h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
        
        {/* Description */}
        <div>
          <label className="block text-sm sm:text-base mb-1 text-gray-300">
            Description
          </label>
          <textarea
            ref={textareaRef}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue (e.g., leaf spots, wilting...)"
            rows="4"
            className="
              w-full p-3 sm:p-4 rounded-lg 
              bg-[#1E293B] border border-gray-700 
              focus:outline-none focus:ring-2 focus:ring-cyan-500 
              text-gray-100 placeholder-gray-400
              text-sm sm:text-base
            "
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm sm:text-base mb-1 text-gray-300">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="
              w-full text-xs sm:text-sm 
              p-2.5 sm:p-3 rounded-lg cursor-pointer
              bg-[#1E293B] border border-gray-700 text-gray-200
              focus:ring-2 focus:ring-cyan-500
            "
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="
            bg-gradient-to-r from-cyan-600 to-blue-500
            hover:from-cyan-500 hover:to-blue-400
            text-white py-2.5 sm:py-3 rounded-lg
            text-sm sm:text-lg font-semibold
            transition-all shadow-md hover:shadow-cyan-400/30
          "
        >
          {loading ? "Analyzing..." : "Analyze Issue"}
        </button>
      </form>

      {/* AI RESULT */}
      {aiResult && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-8 sm:mt-10 space-y-6"
        >
          {/* SUMMARY CARD */}
          <div
            className={`p-4 sm:p-6 rounded-2xl shadow-lg border ${
              aiResult.isEmergency
                ? "border-red-500/60 bg-red-900/20"
                : "border-green-500/60 bg-green-900/10"
            }`}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-cyan-300 mb-3 flex items-center gap-2">
              <span className="text-2xl">🌱</span> Analysis Summary
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
              {/* STATUS */}
              <div className="bg-[#1E293B]/60 p-3 rounded-xl border border-gray-700">
                <p className="font-semibold text-gray-300 text-sm sm:text-base">Status</p>
                <p className="text-white text-sm sm:text-lg">{aiResult.status}</p>
              </div>

              {/* DISEASE */}
              <div className="bg-[#1E293B]/60 p-3 rounded-xl border border-gray-700">
                <p className="font-semibold text-gray-300 text-sm sm:text-base">Disease</p>
                <p className="text-white text-sm sm:text-lg">{aiResult.disease}</p>
              </div>

              {/* CONFIDENCE */}
              <div className="bg-[#1E293B]/60 p-3 rounded-xl border border-gray-700">
                <p className="font-semibold text-gray-300 text-sm sm:text-base">Confidence</p>
                <p className="text-white text-sm sm:text-lg">{aiResult.confidence}</p>
              </div>
            </div>
          </div>

          {/* SYMPTOMS */}
          <div className="p-4 sm:p-6 rounded-2xl bg-[#111827]/80 border border-cyan-600/30 shadow-lg">
            <h4 className="text-lg sm:text-xl font-semibold text-cyan-300 mb-3 flex items-center gap-2">
              <span className="text-xl sm:text-2xl">🩺</span> Symptoms
            </h4>
            <ul className="list-disc list-inside space-y-1 text-gray-200 text-sm sm:text-base">
              {aiResult.symptoms.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* CAUSE */}
          <div className="p-4 sm:p-6 rounded-2xl bg-[#111827]/80 border border-yellow-500/30 shadow-lg">
            <h4 className="text-lg sm:text-xl font-semibold text-yellow-300 mb-3 flex items-center gap-2">
              <span className="text-xl sm:text-2xl">⚠️</span> Cause
            </h4>
            <p className="text-gray-200 leading-relaxed text-sm sm:text-base">
              {aiResult.cause}
            </p>
          </div>

          {/* TREATMENT */}
          <div className="p-4 sm:p-6 rounded-2xl bg-[#111827]/80 border border-green-500/40 shadow-lg">
            <h4 className="text-lg sm:text-xl font-semibold text-green-300 mb-3 flex items-center gap-2">
              <span className="text-xl sm:text-2xl">💊</span> Treatment
            </h4>
            <ul className="list-decimal list-inside space-y-1 text-gray-200 text-sm sm:text-base">
              {aiResult.treatment.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>

          {/* PREVENTION */}
          <div className="p-4 sm:p-6 rounded-2xl bg-[#111827]/80 border border-blue-500/40 shadow-lg">
            <h4 className="text-lg sm:text-xl font-semibold text-blue-300 mb-3 flex items-center gap-2">
              <span className="text-xl sm:text-2xl">🛡️</span> Prevention
            </h4>
            <ul className="list-disc list-inside space-y-1 text-gray-200 text-sm sm:text-base">
              {aiResult.prevention.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AIReportIssue;
