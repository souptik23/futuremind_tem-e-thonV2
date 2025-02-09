import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const AIBankingSection = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const features = [
    {
      title: "Fraud Detection",
      description: "Advanced AI algorithms to detect and prevent fraudulent activities in real-time, keeping your finances secure.",
      icon: (
        <svg className="w-full h-full text-red-400 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      glowColor: "bg-red-500/20"
    },
    {
      title: "Smart Investment",
      description: "Data-driven investment recommendations tailored to your risk profile and financial goals.",
      icon: (
        <svg className="w-full h-full text-green-400 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      glowColor: "bg-green-500/20"
    },
    {
      title: "Performance Analysis",
      description: "Comprehensive analysis of your portfolio performance with AI-powered insights and recommendations.",
      icon: (
        <svg className="w-full h-full text-blue-400 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      glowColor: "bg-blue-500/20"
    },
    {
      title: "AI ChatBot",
      description: "24/7 intelligent assistant for instant support, account inquiries, and financial guidance.",
      icon: (
        <svg className="w-full h-full text-purple-400 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      glowColor: "bg-purple-500/20"
    },
    {
      title: "Market Trend Summarizer",
      description: "Real-time market analysis and trend summaries powered by advanced AI algorithms.",
      icon: (
        <svg className="w-full h-full text-yellow-400 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      glowColor: "bg-yellow-500/20"
    },
    {
      title: "Gamified Learning",
      description: "Learn financial concepts through interactive games and earn rewards while mastering money management.",
      icon: (
        <svg className="w-full h-full text-pink-400 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      ),
      glowColor: "bg-pink-500/20"
    }
  ];

  return (
    <section className="text-gray-600 body-font bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden min-h-screen">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/assets/circuit-pattern.png')] opacity-10 animate-pulse"></div>
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="container px-5 py-24 mx-auto relative">
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0" data-aos="fade-right">
            <h1 className="sm:text-4xl text-3xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                Next Generation AI Banking
              </span>
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded animate-pulse"></div>
          </div>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-300" data-aos="fade-left">
            Experience the future of banking with our AI-powered features. Smart analytics, personalized recommendations, and enhanced security - all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-4"
              data-aos="fade-up"
              data-aos-delay={100 * (index + 1)}
            >
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden">
                {/* Gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Icon container */}
                <div className="w-16 h-16 mb-4 relative">
                  <div className={`absolute inset-0 ${feature.glowColor} rounded-full blur-lg transform group-hover:scale-150 transition-transform duration-500`}></div>
                  {feature.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-xl text-white font-medium mb-2 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 relative z-10">
                  {feature.description}
                </p>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIBankingSection;