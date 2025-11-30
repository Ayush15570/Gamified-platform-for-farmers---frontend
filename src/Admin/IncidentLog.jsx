import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "../utils/axiosInstance";
import { AlertTriangle } from "lucide-react";
import ResolveModal from "./ResolveModal";

const IncidentLog = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const fetchIssues = async () => {
    try {
      const { data } = await axios.get("/crop/all");
      setIssues(data.data || []);
    } catch (error) {
      console.error("Error fetching crop issues:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleResolved = (updatedIssue) => {
    setIssues((prev) =>
      prev.map((i) => (i._id === updatedIssue._id ? updatedIssue : i))
    );
  };

  return (
    <motion.div
      className="w-full p-8 bg-[#0B1120] rounded-2xl border border-cyan-700 shadow-lg text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <h2 className="text-3xl font-semibold text-cyan-400 flex items-center gap-2">
          <AlertTriangle size={28} />
          Reported Crop Issues
        </h2>
        <button
          onClick={fetchIssues}
          className="text-base bg-cyan-700 hover:bg-cyan-600 px-6 py-2 rounded-lg font-medium"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400 text-center py-10 text-lg">
          Loading issues...
        </p>
      ) : issues.length === 0 ? (
        <p className="text-gray-400 text-center py-10 text-lg">
          No crop issues reported yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-base">
            <thead>
              <tr className="text-cyan-400 border-b border-gray-700 text-left">
                <th className="py-4 px-4">Image</th>
                <th className="py-4 px-4">Description</th>
                <th className="py-4 px-4">User</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <motion.tr
                  key={issue._id}
                  className="border-b border-gray-800 hover:bg-gray-900 transition-all"
                  whileHover={{ scale: 1.01 }}
                >
                  <td className="py-4 px-4">
                    <img
                      src={issue.imageUrl}
                      alt="Issue"
                      className="w-28 h-20 rounded-lg object-cover border border-gray-700"
                    />
                  </td>
                  <td className="py-4 px-4 text-gray-300">{issue.description}</td>
                  <td className="py-4 px-4 text-gray-400">
                    {issue.userId?.fullName || "Unknown"}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        issue.status === "resolved"
                          ? "bg-green-600 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {issue.status === "resolved" ? "Resolved" : "Pending"}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {issue.status === "resolved" ? (
                      <p className="text-green-400 italic">
                        {issue.adminResponse || "Resolved"}
                      </p>
                    ) : (
                      <button
                        onClick={() => setSelectedIssue(issue)}
                        className="px-5 py-2 bg-cyan-700 hover:bg-cyan-600 rounded-lg text-sm"
                      >
                        Resolve
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedIssue && (
        <ResolveModal
          issue={selectedIssue}
          onClose={() => setSelectedIssue(null)}
          onResolved={handleResolved}
        />
      )}
    </motion.div>
  );
};

export default IncidentLog;
