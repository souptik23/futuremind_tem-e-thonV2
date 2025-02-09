import { useState } from "react";
import { Link } from "react-router-dom";
import FreeSoloCreateOption from "./Elements/FreeSoloCreateOption";
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { Menu, Close, Language, ArrowDropDown } from "@mui/icons-material"; // Material-UI Icons
import { motion, AnimatePresence } from "framer-motion"; // For animations

const Navbar = () => {
  const { language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setLanguageDropdownOpen(false);
  };

  const t = translations[language];

  return (
    <header className="fixed w-full bg-gradient-to-r from-slate-900/90 via-purple-900/90 to-indigo-900/90 backdrop-blur-md shadow-lg z-50">
      <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <img
            src="ai-bank-logo.png"
            alt="BankBandhu"
            className="w-12 h-12 object-contain"
          />
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            fAInances
          </span>
        </div>

        {/* Search Section - Desktop */}
        {/* <div className="hidden md:block w-1/3 mx-4">
          <FreeSoloCreateOption />
        </div> */}

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-6 items-center">
          {[
            { name: t.home, link: "/home" },
            { name: t.features, link: "/features" },
            { name: t.aiBanking, link: "/ai-banking" },
            { name: t.profile, link: "/profile" },
            { name: t.login, link: "/login" },
            { name: t.signup, link: "/signup" },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="text-gray-300 hover:text-purple-400 transition-colors duration-300 relative group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          {/* Language Switch Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              className="flex items-center space-x-2 p-2 bg-transparent text-gray-300 border border-gray-600 rounded-lg hover:bg-purple-900/50 transition-colors duration-300"
            >
              <Language className="text-purple-400" />
              <span>{language}</span>
              <ArrowDropDown className="text-purple-400" />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {languageDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-40 bg-slate-900/90 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg"
                >
                  {[
                    { value: "English", label: "English" },
                    { value: "Tamil", label: "தமிழ் (Tamil)" },
                    { value: "Hindi", label: "हिंदी (Hindi)" },
                    { value: "Bengali", label: "বাংলা (Bengali)" },
                  ].map((lang) => (
                    <button
                      key={lang.value}
                      onClick={() => handleLanguageChange(lang.value)}
                      className="w-full px-4 py-2 text-gray-300 hover:bg-purple-900/50 hover:text-purple-400 transition-colors duration-300 text-left"
                    >
                      {lang.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-gray-300 hover:text-purple-400 transition-colors duration-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <Close /> : <Menu />}
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-16 left-0 w-full bg-black/90 backdrop-blur-md p-4 lg:hidden"
            >
              {/* Search Section - Mobile */}
              <div className="mb-4">
                {/* <FreeSoloCreateOption /> */}
              </div>

              {/* Mobile Navigation Links */}
              {[
                { name: t.home, link: "/" },
                { name: t.features, link: "/features" },
                { name: t.aiBanking, link: "/ai-banking" },
                { name: t.support, link: "/support" },
                { name: t.login, link: "/login" },
                { name: t.signup, link: "/signup" },
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-white py-2 hover:text-purple-400 transition-colors duration-300"
                >
                  {item.name}
                </Link>
              ))}

              {/* Language Switch Dropdown - Mobile */}
              <div className="mt-4">
                <button
                  onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                  className="flex items-center space-x-2 p-2 bg-transparent text-white border border-gray-600 rounded-lg hover:bg-purple-900/50 transition-colors duration-300"
                >
                  <Language className="text-purple-400" />
                  <span>{language}</span>
                  <ArrowDropDown className="text-purple-400" />
                </button>

                {/* Dropdown Menu - Mobile */}
                <AnimatePresence>
                  {languageDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-2 w-full bg-slate-900/90 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg"
                    >
                      {[
                        { value: "English", label: "English" },
                        { value: "Tamil", label: "தமிழ் (Tamil)" },
                        { value: "Hindi", label: "हिंदी (Hindi)" },
                        { value: "Bengali", label: "বাংলা (Bengali)" },
                      ].map((lang) => (
                        <button
                          key={lang.value}
                          onClick={() => handleLanguageChange(lang.value)}
                          className="w-full px-4 py-2 text-gray-300 hover:bg-purple-900/50 hover:text-purple-400 transition-colors duration-300 text-left"
                        >
                          {lang.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;