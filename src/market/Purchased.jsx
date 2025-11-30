import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { motion } from "framer-motion";

const Purchased = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/products/purchased")
      .then((res) => setItems(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative min-h-screen font-poppins overflow-x-hidden overflow-y-auto bg-gradient-to-br from-[#0a0f12] via-[#132024] to-[#1b2b2f]">

      {/* ✨ Floating Orbs (same as dashboard) */}
      {[...Array(7)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            width: `${Math.random() * 140 + 120}px`,
            height: `${Math.random() * 140 + 120}px`,
            background: `hsl(${Math.random() * 360}, 70%, 60%)`,
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 90}%`,
          }}
          animate={{
            y: [0, 20, 0],
            x: [0, 10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: Math.random() * 6 + 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <main className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 py-16">
        <h1 className="text-4xl font-bold text-lime-400 tracking-wide mb-10 text-center">
          📦 Purchased Items
        </h1>

        {loading ? (
          <div className="text-center text-gray-300 text-lg">Loading...</div>
        ) : items.length === 0 ? (
          <div className="text-center text-gray-400 text-lg mt-20">
            You haven't purchased anything yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {items.map((i, index) => (
              <motion.div
                key={i._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(50, 205, 50, 0.5)",
                }}
                className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-xl"
              >
                {/* Product Title */}
                <h2 className="text-xl font-semibold text-white mb-3">
                  {i.productId?.title}
                </h2>

                {/* Redeemed Date */}
                <p className="text-sm text-gray-300 mb-4">
                  Redeemed on:{" "}
                  <span className="text-lime-300 font-medium">
                    {new Date(i.redeemedAt).toLocaleString()}
                  </span>
                </p>

                {/* Download Button */}
                <a
                  href={i.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center mt-4 bg-gradient-to-r from-lime-400 to-cyan-400 text-black font-semibold py-2 rounded-xl shadow-lg hover:opacity-90 transition-all"
                >
                  ⬇️ Download File
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Purchased;
