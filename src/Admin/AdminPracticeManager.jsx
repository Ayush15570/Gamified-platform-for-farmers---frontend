import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const AdminPracticeManager = () => {
  const [practices, setPractices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchPractices = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/admin/pending-practices");
      setPractices(res.data.data || []);
    } catch (error) {
      console.error("Error fetching pending practices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPractices();
  }, []);

  const handleAction = async (userPracticeId, action) => {
    try {
      await axiosInstance.post("/admin/verify", {
        userPracticeId,
        action,
        points: action === "approved" ? 10 : 0,
      });
      fetchPractices();
    } catch (error) {
      console.error(`Error performing ${action}:`, error);
    }
  };

  return (
    <div className="w-full bg-[#0B1220] p-8 rounded-2xl border border-cyan-500/40 shadow-lg mt-10 text-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <h2 className="text-3xl text-cyan-400 font-semibold">
          Pending Practice Submissions
        </h2>
      </div>

      {loading ? (
        <div className="text-gray-400 text-center py-10 text-lg">Loading...</div>
      ) : practices.length === 0 ? (
        <div className="text-gray-400 text-center py-10 text-lg">
          No pending practices found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-base">
            <thead>
              <tr className="text-cyan-400 border-b border-gray-700 text-left">
                <th className="py-4 px-4">Farmer</th>
                <th className="py-4 px-4">Phone Number</th>
                <th className="py-4 px-4">Practice Title</th>
                <th className="py-4 px-4">Image</th>
                <th className="py-4 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {practices.map((p) => (
                <tr
                  key={p._id}
                  className="border-b border-gray-800 hover:bg-gray-900 transition-all"
                >
                  <td className="py-4 px-4">{p.userId?.fullName || "Unknown"}</td>
                  <td className="py-4 px-4">{p.userId?.phoneNumber || "N/A"}</td>
                  <td className="py-4 px-4">{p.practiceId?.title || "N/A"}</td>
                  <td className="py-4 px-4">
                    <img
                      src={p.photo}
                      alt="Practice"
                      className="w-28 h-20 rounded-lg object-cover border border-gray-700 cursor-pointer"
                      onClick={() => setSelectedImage(p.photo)}
                    />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex flex-wrap justify-center gap-3">
                      <button
                        onClick={() => handleAction(p._id, "approved")}
                        className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-500"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(p._id, "reject")}
                        className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Zoomed"
            className="max-w-[90%] max-h-[90%] rounded-lg border border-gray-700 shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default AdminPracticeManager;
