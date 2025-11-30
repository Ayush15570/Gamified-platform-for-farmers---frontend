import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";

function LandingPage() {
  const navigate = useNavigate();
  const status = useSelector((state) => state.auth.status);
  const [scrollY, setScrollY] = useState(0);
  const controls = useAnimation();

  // Navigate on Get Started
  const handleGetStarted = () => {
    if (status) navigate("/dashboard");
    else navigate("/signup");
  };

  // Parallax scroll effect (throttled-ish)
  useEffect(() => {
    const onScroll = () => {
      // reduce parallax intensity on small screens
      const factor = window.innerWidth < 640 ? 0.12 : 0.3;
      setScrollY(window.scrollY * factor);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fade-in animation on mount
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    });
  }, [controls]);

  // particle count responsive (fewer on small screens)
  const particleCount = typeof window !== "undefined" && window.innerWidth < 640 ? 10 : 20;

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden text-white">
      {/* Background Image with parallax */}
      <motion.img
        src="/images/Farmer.avif"
        alt="Farmer"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: `translateY(${scrollY}px)` }}
        draggable={false}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

      {/* Floating Particles (hidden on very small screens) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* hide detailed particles on xs to save perf */}
        <div className="hidden sm:block">
          {[...Array(particleCount)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-2 h-2 bg-lime-400 rounded-full opacity-40"
              initial={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 800),
                y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 600),
                scale: Math.random() * 0.8 + 0.4,
              }}
              animate={{
                y: [-50, (typeof window !== "undefined" ? window.innerHeight : 600) + 50],
                opacity: [0, 0.45, 0],
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={controls}
        className="relative z-10 text-center px-4 sm:px-12 max-w-3xl md:max-w-4xl"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight drop-shadow-lg font-poppins">
          Revolutionizing Agriculture
          <br className="hidden sm:block" />
          Through Innovation
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
          Discover sustainable farming solutions and cutting-edge technologies that empower the next generation of farmers.
        </p>

        <motion.button
          whileHover={{
            scale: 1.06,
            boxShadow: "0px 0px 15px rgba(163, 230, 53, 0.6)",
          }}
          whileTap={{ scale: 0.96 }}
          onClick={handleGetStarted}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-lime-400 text-black font-semibold rounded-full hover:bg-lime-500 transition-all duration-300 shadow-md"
        >
          Get Started
        </motion.button>
      </motion.div>
    </section>
  );
}

export default LandingPage;
