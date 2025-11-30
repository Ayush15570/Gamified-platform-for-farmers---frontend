import React, { useEffect, useState, useRef } from "react";
import axios from "../utils/axiosInstance";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

import WelcomeCard from "./WelcomeCard";
import StatsPanel from "./StatsPanel";
import PracticeCard from "./PracticeCard";
import Achievements from "./Achievements";

const Dashboard = () => {
  const { t } = useTranslation();

  const [user, setUser] = useState(null);
  const [rank, setRank] = useState(null);
  const [dailyChallenge, setDailyChallenge] = useState(null);
  const [userPractices, setUserPractices] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Stable background orb positions (no random on every render)
  const orbs = useRef([
    { w: 120, h: 120, top: "10%", left: "5%", color: "hsl(200,70%,60%)", dur: 12 },
    { w: 140, h: 140, top: "40%", left: "75%", color: "hsl(120,70%,60%)", dur: 15 },
    { w: 110, h: 110, top: "70%", left: "20%", color: "hsl(300,70%,60%)", dur: 10 },
    { w: 130, h: 130, top: "25%", left: "45%", color: "hsl(45,70%,60%)", dur: 17 },
  ]).current;

  // Fetch all dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [userRes, rankRes, dailyRes, userPracticeRes, leaderboardRes] =
          await Promise.all([
            axios.get("/users/get-user"),
            axios.get("/leaderboard/my-rank"),
            axios.get("/challenge/daily"),
            axios.get("/practice/user"),
            axios.get("/leaderboard/global"),
          ]);

        setUser(userRes.data.data.user);
        setRank(rankRes.data.data);
        setDailyChallenge(dailyRes.data.data);
        setUserPractices(userPracticeRes.data.data);
        setTopUsers(leaderboardRes.data.data);
      } catch (err) {
        console.error("Dashboard Load Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ------------------- VIP HANDLER ---------------------
  const handleVIPClick = async () => {
    const result = await Swal.fire({
      title: `🌟 ${t("vip_title")}`,
      html: `
        <div style="text-align: left; font-size: 1rem; color: #e2e8f0;">
          <ul>
            <li>✅ ${t("vip_feature1")}</li>
            <li>✅ ${t("vip_feature2")}</li>
            <li>✅ ${t("vip_feature3")}</li>
            <li>✅ ${t("vip_feature4")}</li>
          </ul>
          <p style="margin-top: 1rem; color: #38bdf8;">
            ${t("vip_points_text")}
          </p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: t("vip_activate_btn"),
      cancelButtonText: t("vip_cancel_btn"),
      background: "#0f172a",
      color: "#fff",
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#ef4444",
    });

    if (result.isConfirmed) {
      try {
        await axios.post("/subscription/activate");

        Swal.fire({
          icon: "success",
          title: `🎉 ${t("vip_success_title")}`,
          text: t("vip_success_text"),
          confirmButtonColor: "#22c55e",
        });

        const userRes = await axios.get("/users/get-user");
        setUser(userRes.data.data.user);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: t("vip_error_title"),
          text: err.response?.data?.message || t("vip_error_text"),
          confirmButtonColor: "#ef4444",
        });
      }
    }
  };

  return (
    <div className="relative min-h-screen  font-poppins overflow-x-hidden bg-gradient-to-br from-[#0a0f12] via-[#132024] to-[#1b2b2f] py-10">

      {/* Background Orbs (responsive safe positions) */}
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{
            width: o.w,
            height: o.h,
            top: o.top,
            left: o.left,
            background: o.color,
          }}
          animate={{ y: [0, 15, 0], x: [0, 10, 0], opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: o.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Loading */}
        {loading ? (
          <div className="text-center text-gray-300 text-lg">
            {t("loading_dashboard")}
          </div>
        ) : (
          <>
            {/* Welcome Card */}
            <WelcomeCard user={user} rank={rank} />

            {/* Stats */}
            <StatsPanel
              totalPoints={user?.totalPoints || 0}
              totalCompleted={userPractices.length}
            />

            {/* DAILY CHALLENGE */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 backdrop-blur-lg p-5 sm:p-6 md:p-8 rounded-3xl shadow-xl border border-lime-300"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-5 text-lime-400 text-center">
                🌱 {t("daily_challenge")}
              </h2>

              {dailyChallenge ? (
                <PracticeCard
                  practice={dailyChallenge}
                  userPractice={userPractices.find(
                    (p) => p.practiceId && p.practiceId._id === dailyChallenge._id
                  )}
                  onPracticeUpdated={async () => {
                    const res = await axios.get("/practice/user");
                    setUserPractices(res.data.data);
                  }}
                  highlight={true}
                />
              ) : (
                <p className="text-center text-gray-400 text-lg">
                  {t("no_daily_challenge")}
                </p>
              )}
            </motion.section>

            {/* ACHIEVEMENTS */}
            <Achievements completedPractices={userPractices} />

            {/* LEADERBOARD */}
            <section className="bg-white/5 backdrop-blur p-5 sm:p-6 md:p-8 rounded-3xl shadow-2xl border border-white/10 overflow-x-auto">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-lime-400">
                🏆 {t("leaderboard")}
              </h2>

              <div className="divide-y divide-white/10 w-full">
                {topUsers.map((u, index) => {
                  const isCurrent = u._id === user?._id;
                  return (
                    <div
                      key={u._id}
                      className={`flex justify-between items-center px-4 sm:px-6 py-4 rounded-xl text-sm sm:text-base
                        ${isCurrent ? "bg-lime-500/10 border-l-4 border-l-lime-400" : "hover:bg-white/5"}
                      `}
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full font-bold text-white bg-white/10">
                          {index + 1}
                        </div>
                        <span className="text-white truncate">{u.fullName}</span>
                      </div>

                      <div className="text-lime-400 font-bold whitespace-nowrap">
                        {u.totalPoints} XP
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}
      </main>

      {/* VIP BUTTON */}
      <motion.button
        onClick={handleVIPClick}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 
          bg-gradient-to-r from-lime-400 to-cyan-400 text-black 
          font-semibold px-5 sm:px-6 py-3 rounded-full shadow-2xl 
          border-2 border-white/20 flex items-center gap-2"
        whileHover={{ scale: 1.07, rotate: 3 }}
        whileTap={{ scale: 0.95 }}
      >
        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
        {t("go_vip")}
      </motion.button>
    </div>
  );
};

export default Dashboard;
