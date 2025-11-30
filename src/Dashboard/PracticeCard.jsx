import React, { useState } from "react";
import axios from "../utils/axiosInstance";

const PracticeCard = ({ practice, userPractice, onPracticeUpdated, highlight = false }) => {
  const [loading, setLoading] = useState(false);

  const status = userPractice?.status;

  const handleComplete = async () => {
    if (status === "pending") return alert("Already submitted! Waiting for admin approval.");
    if (status === "approved") return alert("You have already completed this practice.");

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();

    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("practiceId", practice._id);
      formData.append("photo", file);

      try {
        setLoading(true);
        const res = await axios.post("/practice/complete-practice", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert(res.data.message || "Submitted!");
        onPracticeUpdated();
      } catch (err) {
        alert(err.response?.data?.message || "Submission failed");
      } finally {
        setLoading(false);
      }
    };
  };

  const buttonText = () => {
    if (status === "approved") return "✅ Completed";
    if (status === "pending") return "🕓 Awaiting Approval";
    if (status === "rejected") return "❌ Rejected";
    return "Complete Practice";
  };

  const buttonClass = () => {
    if (status === "approved") return "bg-green-500 cursor-not-allowed text-white";
    if (status === "pending") return "bg-yellow-400 cursor-not-allowed text-black";
    if (status === "rejected") return "bg-red-500 cursor-not-allowed text-white";

    return highlight
      ? "bg-lime-500 hover:bg-lime-600 text-black shadow-lg animate-pulse"
      : "bg-lime-600 hover:bg-lime-700 text-white";
  };

  return (
    <div
      className={`rounded-2xl border shadow-xl flex flex-col justify-between 
        p-4 sm:p-6 
        min-h-[180px] sm:min-h-[220px]
        ${highlight
          ? "bg-gradient-to-br from-lime-200 to-lime-400 border-lime-500"
          : "bg-white border-gray-300"}
      `}
    >
      {/* Title */}
      <h3
        className={`font-bold mb-2 
          text-lg sm:text-xl 
          ${highlight ? "text-black" : "text-gray-900"}
        `}
      >
        {practice?.title || "Untitled Practice"}
      </h3>

      {/* Description */}
      <p
        className={`flex-grow leading-relaxed 
          text-sm sm:text-base 
          break-words 
          ${highlight ? "text-gray-800" : "text-gray-700"}
        `}
      >
        {practice?.description || "No description provided."}
      </p>

      {/* Button */}
      <button
        onClick={handleComplete}
        disabled={loading || status === "pending" || status === "approved"}
        className={`mt-4 w-full py-2.5 sm:py-3 
          text-sm sm:text-base 
          rounded-lg font-semibold transition 
          ${buttonClass()}
        `}
      >
        {loading ? "Uploading..." : buttonText()}
      </button>
    </div>
  );
};

export default PracticeCard;
