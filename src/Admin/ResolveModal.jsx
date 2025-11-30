import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import axios from "../utils/axiosInstance";

const ResolveModal = ({ issue, onClose, onResolved }) => {
  const [adminResponse, setAdminResponse] = useState("");
  const [loading, setLoading] = useState(false);

  if (!issue) return null;

  const handleResolve = async () => {
    if (!adminResponse.trim()) {
      alert("Please enter a response message!");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post("/crop/resolve", {
        issueId: issue._id,
        adminResponse,
      });

      onResolved(data.data); // callback to parent
      onClose();
    } catch (err) {
      console.error("Resolve failed:", err);
      alert(err.response?.data?.message || "Failed to resolve issue!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-[#0A0F1F] border border-cyan-500 rounded-2xl p-6 w-[90%] max-w-md text-white relative shadow-2xl"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-cyan-400 mb-3">
          Resolve Crop Issue
        </h2>

        {/* Issue Info */}
        <div className="mb-4">
          <img
            src={issue.imageUrl}
            alt="Crop Issue"
            className="rounded-lg w-full h-48 object-cover border border-gray-700 mb-3"
          />
          <p className="text-gray-300 text-sm mb-2">
            <strong>Problem:</strong> {issue.description}
          </p>
          <p className="text-gray-400 text-xs italic">
            Reported by: {issue.userId?.fullName || "Unknown"}
          </p>
        </div>

        {/* Response Input */}
        <textarea
          value={adminResponse}
          onChange={(e) => setAdminResponse(e.target.value)}
          className="w-full p-3 bg-gray-900 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500"
          rows={3}
          placeholder="Write your response to help the user..."
        />

        {/* Buttons */}
        <div className="flex justify-end mt-4 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleResolve}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-sm font-medium"
          >
            {loading ? "Resolving..." : "Resolve"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResolveModal;
