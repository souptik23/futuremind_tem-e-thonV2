import React, { useEffect, useState } from "react";
import BankBuildingScene from './BankBuildingScene'; // Ensure this component exists
// import SplineScene from './SplineScene'; // Import the SplineScene component
import Crosshair from '../components/reactbits/Crosshair'; // Ensure this component exists
import './HeroSection.css'; // Import custom CSS for animations
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import SplineScene from "./Elements/SplineScene";
const HeroSection = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="pt-32 pb-20 relative overflow-hidden" style={{ backgroundColor: '#0F1011' }}>
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Animated Particles */}
        <div className="absolute w-24 h-24 bg-green-500/20 rounded-full blur-3xl animate-pulse top-1/4 left-1/4"></div>
        <div className="absolute w-16 h-16 bg-green-500/20 rounded-full blur-3xl animate-pulse bottom-1/4 right-1/4"></div>
        <div className="absolute w-32 h-32 bg-green-500/20 rounded-full blur-3xl animate-pulse top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

        {/* Floating Lines */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-20">
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="0.5" />
          <line x1="0" y1="100%" x2="100%" y2="0" stroke="white" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Cursor Glow Effect */}
      <div
        className="absolute w-48 h-48 bg-gradient-to-r from-green-500/20 to-green-500/20 rounded-full blur-2xl pointer-events-none transition-opacity duration-300"
        style={{
          left: `${cursorPosition.x - 96}px`,
          top: `${cursorPosition.y - 96}px`,
        }}
      ></div>

      {/* Main Content Container */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="text-left">
            {/* Animated Title */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600 animate-gradient-x cut-text">
                {t.nextGenBanking}
              </span>
              <span className="block mt-2 text-4xl slide-in-text">
                {t.poweredByAI}
              </span>
            </h1>
            {/* Animated Paragraph */}
            <p className="text-xl text-gray-300 mb-8 fade-in-text">
              {t.heroDescription}
            </p>
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300">
                <span className="relative z-10 text-white font-medium">
                  {t.openAccount}
                </span>
              </button>
              <button className="px-8 py-4 border-2 border-green-500 text-green-400 rounded-lg hover:bg-green-500/10 transition-all duration-300">
                {t.watchDemo}
              </button>
            </div>
          </div>
          {/* Right Column - Spline Scene */}
          <div className="relative h-[500px] w-full flex items-center justify-center">
            <div className="w-full h-full">
              <SplineScene />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Vector Graphics */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        {/* Top-left Corner Decoration */}
        <svg
          className="absolute top-0 left-0 w-48 h-48 text-green-500/20 opacity-50"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50,100 C50,150 150,150 150,100 C150,50 50,50 50,100 Z"
            fill="currentColor"
          />
        </svg>

        {/* Bottom-right Corner Decoration */}
        <svg
          className="absolute bottom-0 right-0 w-48 h-48 text-green-500/20 opacity-50"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="80" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;