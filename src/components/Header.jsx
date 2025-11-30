import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import { logout as logoutAction } from "../store/authSlice";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function Header() {
  const { t } = useTranslation();
  const authStatus = useSelector((state) => state.auth.status);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      await axiosInstance.post("/users/logout");
    } catch {}
    dispatch(logoutAction());
    navigate("/login");
  };

  const loggedInLinks = [
    { name: t("home"), path: "/" },
    
    { name: t("crop_issue"), path: "/issues" },
    { name: t("marketplace"), path: "/products" },
  { name: t("purchased"), path: "/purchased" }
  ];

  const loggedOutLinks = [{ name: t("about"), path: "/about" }];

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* TOP BAR */}
      <motion.div
        animate={{
          backgroundColor: scrolled ? "#ffffff" : "rgba(0,0,0,0)",
          color: scrolled ? "#111827" : "#ffffff",
        }}
        transition={{ duration: 0.25 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center py-4"
      >
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-semibold tracking-tight font-poppins hover:opacity-90 transition-all"
        >
          FarmWise
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-base font-medium font-poppins">
          {(authStatus ? loggedInLinks : loggedOutLinks).map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="relative group hover:text-lime-500 transition-colors duration-300"
            >
              {link.name}
              <span className="absolute left-0 -bottom-[3px] w-0 h-[2px] bg-lime-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}

          {/* Desktop CTAs */}
          {authStatus ? (
            <>
              <Link
                to="/dashboard"
                className="px-4 py-2 bg-lime-400 text-gray-900 rounded-full font-semibold hover:bg-lime-500 hover:scale-105 transition-all duration-200 shadow-sm"
              >
                {t("dashboard")}
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-red-200 hover:text-red-700 transition-all duration-200"
              >
                <LogOut size={16} /> {t("logout")}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 bg-lime-400 text-gray-900 rounded-full font-semibold hover:bg-lime-500 transition-all shadow-sm"
              >
                {t("login")}
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 bg-lime-400 text-gray-900 rounded-full font-semibold hover:bg-lime-500 transition-all shadow-sm"
              >
                {t("register")}
              </Link>
            </>
          )}

          {/* Language Switcher */}
          <LanguageSwitcher />
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden focus:outline-none"
        >
          {menuOpen ? (
            <X
              size={26}
              className={scrolled ? "text-gray-900" : "text-white"}
            />
          ) : (
            <Menu
              size={26}
              className={scrolled ? "text-gray-900" : "text-white"}
            />
          )}
        </button>
      </motion.div>

      {/* MOBILE NAV */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className={`
              md:hidden flex flex-col items-center space-y-5 py-6
              text-base font-medium font-poppins backdrop-blur-lg 
              ${
                scrolled
                  ? "bg-white text-gray-900"
                  : "bg-black/80 text-white"
              }
            `}
          >
            {(authStatus ? loggedInLinks : loggedOutLinks).map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="hover:text-lime-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {authStatus ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 bg-lime-400 text-gray-900 rounded-full font-semibold hover:bg-lime-500 transition-all shadow-sm"
                >
                  {t("dashboard")}
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="
                    flex items-center gap-2 px-4 py-2 
                    bg-red-500 text-white rounded-full 
                    hover:bg-red-600 transition-all shadow-sm
                  "
                >
                  <LogOut size={16} /> {t("logout")}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 bg-lime-400 text-gray-900 rounded-full font-semibold hover:bg-lime-500 transition-all shadow-sm"
                >
                  {t("login")}
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 bg-lime-400 text-gray-900 rounded-full font-semibold hover:bg-lime-500 transition-all shadow-sm"
                >
                  {t("register")}
                </Link>
              </>
            )}

            {/* Mobile Language Switcher */}
            <LanguageSwitcher />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
