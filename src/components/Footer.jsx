import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const orbs = [
    { size: 140, top: "15%", left: "10%", color: "hsl(200,70%,60%)" },
    { size: 180, top: "50%", left: "70%", color: "hsl(120,70%,60%)" },
    { size: 120, top: "75%", left: "30%", color: "hsl(300,70%,60%)" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#0B1220] to-[#050A18] text-gray-300 pt-10 pb-6 overflow-hidden">
      
      {/* Stable Animated Orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            width: orb.size,
            height: orb.size,
            background: orb.color,
            top: orb.top,
            left: orb.left,
          }}
          animate={{ y: [0, 20, 0], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-lime-400 mb-2">🌾 GreenGrow</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Empowering farmers with sustainable solutions and AI-powered insights for a healthier planet.
          </p>
        </div>

        {/* Quick Info */}
        <div>
          <h3 className="text-xl font-semibold text-lime-400 mb-3">Quick Info</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li className="hover:text-lime-400 transition">📞 +91 XXXXXXX52</li>
            <li className="hover:text-lime-400 transition">📧 invisionx847@gmail.com</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-xl font-semibold text-lime-400 mb-3">Connect with Us</h3>
          <div className="flex justify-center sm:justify-start gap-4">
            
            <motion.a
              href="https://github.com/Ayush15570/farmer"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15 }}
              className="text-gray-400 hover:text-white text-2xl transition"
            >
              <FaGithub />
            </motion.a>

            <motion.a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15 }}
              className="text-gray-400 hover:text-[#0A66C2] text-2xl transition"
            >
              <FaLinkedin />
            </motion.a>

            <motion.a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15 }}
              className="text-gray-400 hover:text-[#E1306C] text-2xl transition"
            >
              <FaInstagram />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10 mt-8 mb-4"></div>

      {/* Bottom Text */}
      <p className="text-center text-xs sm:text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-lime-400 font-semibold">GreenGrow</span>. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
