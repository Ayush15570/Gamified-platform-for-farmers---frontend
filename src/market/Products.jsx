import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import Purchased from "./Purchased";
import { useNavigate } from "react-router-dom";
// Imported Images
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.png";
import image7 from "../assets/image7.png";
import image8 from "../assets/image8.png";
import image9 from "../assets/image9.png";

const productImages = {
  "Crop Care eBook": image1,
  "Smart Irrigation Guide": image2,
  "Fertilizer Optimization Chart": image3,
  "Organic Farming Starter Kit": image4,
  "Soil Health Improvement PDF": image5,
  "Pest Identification Guide": image6,
  "Weather Prediction Tips (Video)": image7,
  "Seasonal Crop Planner": image8,
};

const fallbackImage = image9;

const Products = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState(null);
  const [message, setMessage] = useState("");

  const user = useSelector((state) => state.auth.userData);

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/products");
      setProducts(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRedeem = async (productId) => {
    setRedeeming(productId);

    try {
      await axiosInstance.post(`/products/redeem/${productId}`);
      setMessage("🎉 Product redeemed successfully!");
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      setMessage("❌ " + msg);
    } finally {
      setTimeout(() => setMessage(""), 2500);
      setRedeeming(null);
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-300">Loading products...</p>;

  return (
    <div className="relative min-h-screen font-poppins overflow-hidden bg-gradient-to-br from-[#0a0f12] via-[#132024] to-[#1b2b2f] p-6">

      {/* Background neon shapes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            width: `${Math.random() * 160 + 120}px`,
            height: `${Math.random() * 160 + 120}px`,
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

      <div className="relative z-10 max-w-7xl mx-auto mt-10">

        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-4 text-lime-400 drop-shadow-lg">
  🛒 Marketplace
</h1>

{/* Go to Purchased Page */}
<div className="text-center mb-8">
  <button
        onClick={() => navigate("/purchased")}
        className="px-6 py-3 bg-gradient-to-r from-lime-400 to-cyan-400 text-black font-semibold rounded-xl shadow-lg hover:scale-105 transition-all"
      >
        📦 View My Purchases
      </button>
</div>


        {/* User Points */}
        <div className="text-center text-lg mb-6">
          <span className="bg-lime-500/20 px-5 py-3 rounded-xl border border-lime-400/40 backdrop-blur-lg text-lime-300">
            Your Points: <span className="font-bold">{user?.totalPoints || 0}</span>
          </span>
        </div>

        {/* Message */}
        {message && (
          <motion.div
            className="mb-6 p-3 rounded-xl text-center font-semibold bg-white/10 text-white border border-white/20 backdrop-blur-xl max-w-md mx-auto shadow-xl"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {message}
          </motion.div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div
              key={product._id}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg p-5 
              hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {/* Product Image */}
              <img
                src={productImages[product.title] || fallbackImage}
                alt={product.title}
                className="w-full h-40 object-cover rounded-xl mb-4 border border-white/10"
              />

              <h2 className="text-xl font-bold mb-2 text-lime-300">
                {product.title}
              </h2>

              <p className="text-gray-300 text-sm mb-3">{product.description}</p>

              <p className="font-semibold text-lime-400 mb-4">
                Cost: {product.pointsCost} points
              </p>

              <button
                disabled={redeeming === product._id}
                onClick={() => handleRedeem(product._id)}
                className={`w-full py-2 rounded-xl font-semibold transition ${
                  redeeming === product._id
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-lime-400 to-cyan-400 text-black hover:scale-105 shadow-lg"
                }`}
              >
                {redeeming === product._id ? "Processing..." : "Redeem"}
              </button>

            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
