import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="
      w-64 
      bg-[#0b0f12]/80 
      backdrop-blur-2xl 
      border-r border-white/10 
      min-h-screen 
      fixed left-0 top-0
      px-5 py-8
      shadow-[4px_0_20px_-2px_rgba(0,255,100,0.1)]
    ">
      
      {/* Title */}
      <h1 className="text-3xl font-bold mb-12 text-lime-400 tracking-wide">
        Marketplace
      </h1>

      {/* Navigation */}
      <nav className="flex flex-col gap-3 text-lg">
        
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `
              group flex items-center gap-3 p-3 rounded-xl transition-all 
              ${isActive 
                ? "bg-lime-400 text-black font-semibold shadow-lg shadow-lime-400/40" 
                : "hover:bg-white/10 text-gray-300"}
            `
          }
        >
          <span className="text-xl">🛍️</span>
          <span>Products</span>

          {/* Active Indicator Line */}
          {({ isActive }) =>
            isActive ? (
              <div className="ml-auto w-2 h-8 rounded-full bg-lime-500 shadow-lg shadow-lime-400/50" />
            ) : null
          }
        </NavLink>

        <NavLink
          to="/purchased"
          className={({ isActive }) =>
            `
              group flex items-center gap-3 p-3 rounded-xl transition-all 
              ${isActive 
                ? "bg-cyan-400 text-black font-semibold shadow-lg shadow-cyan-400/40" 
                : "hover:bg-white/10 text-gray-300"}
            `
          }
        >
          <span className="text-xl">📦</span>
          <span>Purchased</span>

          {({ isActive }) =>
            isActive ? (
              <div className="ml-auto w-2 h-8 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
            ) : null
          }
        </NavLink>

      </nav>
    </div>
  );
};

export default Sidebar;
