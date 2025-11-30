import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";

const ResourceBarChart = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get("/admin/stats");
        console.log("Admin Stats:", res.data);
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      }
    };
    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div className="text-center text-gray-400 mt-8">
        Loading Resource Data...
      </div>
    );
  }

  const data = [
    { name: "Approved", value: stats.approvedPractices },
    { name: "Pending", value: stats.pendingPractices },
    { name: "Rejected", value: stats.rejectedPractices },
    { name: "Crop Reported", value: stats.cropIssuesReported },
    { name: "Crop Resolved", value: stats.cropIssueResolved },
  ];

  return (
    <div className="bg-[#0B1220] p-6 rounded-2xl shadow-lg border border-cyan-500/30">
      <h2 className="text-xl font-semibold text-cyan-400 mb-4 text-center">
        Resource Allocation Overview
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
          <XAxis dataKey="name" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "1px solid #00FFFF",
              color: "#E5E7EB",
            }}
          />
          <Legend wrapperStyle={{ color: "#9CA3AF" }} />
          <Bar dataKey="value" fill="#00FFFF" barSize={30} radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResourceBarChart;
