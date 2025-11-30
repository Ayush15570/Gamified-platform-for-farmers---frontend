import React from "react";
import { motion } from "framer-motion";
import { Trophy, ShieldCheck, Zap, Star } from "lucide-react";

const Achievements = ({ stats }) => {
  if (!stats) return null;

  // 🧠 Define achievements based on stats
  const achievements = [
    {
      id: 1,
      title: "Uptime Hero",
      description: "Maintain system health above 90%",
      achieved: stats.systemHealth > 90,
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
    },
    {
      id: 2,
      title: "Eco Guardian",
      description: "Resolve at least 5 crop issues",
      achieved: stats.cropIssueResolved >= 5,
      icon: <ShieldCheck className="w-6 h-6 text-green-400" />,
    },
    {
      id: 3,
      title: "Verification Master",
      description: "Approve more than 20 practices",
      achieved: stats.approvedPractices > 20,
      icon: <Trophy className="w-6 h-6 text-orange-400" />,
    },
    {
      id: 4,
      title: "Problem Solver",
      description: "Keep pending practices below 10",
      achieved: stats.pendingPractices < 10,
      icon: <Star className="w-6 h-6 text-blue-400" />,
    },
  ];

  return (
    <div className="bg-[#0B1220] p-6 rounded-2xl border border-cyan-500/30 shadow-lg">
      <h2 className="text-xl font-semibold text-cyan-400 mb-4 text-center">
        Achievements
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {achievements.map((ach, index) => (
          <motion.div
            key={ach.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl border ${
              ach.achieved
                ? "border-green-400 bg-green-900/10"
                : "border-gray-600 bg-gray-800/20"
            } flex items-center gap-4`}
          >
            <div
              className={`p-2 rounded-full ${
                ach.achieved ? "bg-green-500/20" : "bg-gray-600/20"
              }`}
            >
              {ach.icon}
            </div>
            <div>
              <h3
                className={`text-lg font-semibold ${
                  ach.achieved ? "text-green-400" : "text-gray-400"
                }`}
              >
                {ach.title}
              </h3>
              <p className="text-sm text-gray-500">{ach.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
