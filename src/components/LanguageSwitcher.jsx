import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "hi" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("i18nextLng", newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1 border rounded hover:bg-gray-100"
      aria-label="Toggle language"
    >
      {i18n.language === "en" ? "हिंदी" : "English"}
    </button>
  );
};

export default LanguageSwitcher;
