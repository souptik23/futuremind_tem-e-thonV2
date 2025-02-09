import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Brain,
  ShieldAlert,
  Users,
  Languages,
  Trophy,
  LineChart,
  MessageSquare,
  Fingerprint,
} from "lucide-react";

// Features array with enhanced icons and descriptions
const features = [
  {
    title: "Explainable AI",
    description:
      "Transparent AI decision-making with detailed insights into system operations and real-time explanations of all banking decisions.",
    icon: <Brain className="w-full h-full text-blue-400" />,
    glowColor: "bg-blue-500/20",
    gradient: "from-blue-500/20 via-blue-400/20 to-blue-300/20",
  },
  {
    title: "Fraud Detection",
    description:
      "Advanced real-time fraud prevention using state-of-the-art AI algorithms and behavioral analysis.",
    icon: <ShieldAlert className="w-full h-full text-red-400" />,
    glowColor: "bg-red-500/20",
    gradient: "from-red-500/20 via-red-400/20 to-red-300/20",
  },
  {
    title: "Smart Recommendations",
    description:
      "Personalized financial advice powered by machine learning, tailored to your unique spending patterns and goals.",
    icon: <Users className="w-full h-full text-green-400" />,
    glowColor: "bg-green-500/20",
    gradient: "from-green-500/20 via-green-400/20 to-green-300/20",
  },
  {
    title: "Multilingual Support",
    description:
      "Seamless banking services in multiple languages with AI-powered real-time translation and cultural adaptation.",
    icon: <Languages className="w-full h-full text-purple-400" />,
    glowColor: "bg-purple-500/20",
    gradient: "from-purple-500/20 via-purple-400/20 to-purple-300/20",
  },
  {
    title: "Gamified Experience",
    description:
      "Earn rewards and achievements while managing your finances effectively through our engaging platform.",
    icon: <Trophy className="w-full h-full text-yellow-400" />,
    glowColor: "bg-yellow-500/20",
    gradient: "from-yellow-500/20 via-yellow-400/20 to-yellow-300/20",
  },
  {
    title: "Real-time Analytics",
    description:
      "Live tracking of your financial metrics with predictive insights and interactive visualizations.",
    icon: <LineChart className="w-full h-full text-pink-400" />,
    glowColor: "bg-pink-500/20",
    gradient: "from-pink-500/20 via-pink-400/20 to-pink-300/20",
  },
  {
    title: "AI Chat Assistant",
    description:
      "24/7 intelligent support with natural language understanding for all your banking needs and queries.",
    icon: <MessageSquare className="w-full h-full text-indigo-400" />,
    glowColor: "bg-indigo-500/20",
    gradient: "from-indigo-500/20 via-indigo-400/20 to-indigo-300/20",
  },
  {
    title: "Biometric Security",
    description:
      "State-of-the-art security with multi-factor authentication including fingerprint and face recognition.",
    icon: <Fingerprint className="w-full h-full text-cyan-400" />,
    glowColor: "bg-cyan-500/20",
    gradient: "from-cyan-500/20 via-cyan-400/20 to-cyan-300/20",
  },
];

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxY = -scrollY * 0.5;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/api/placeholder/400/400')] opacity-10 animate-pulse"></div>
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-32 pb-12 sm:pb-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              {/* AI Banking Badge */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-xl w-fit px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-violet-400 rounded-full"
                />
                <span className="text-violet-200 text-sm font-medium tracking-wide">
                  Next-Gen AI Banking
                </span>
              </motion.div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
                <span className="text-white">Transform Your Banking With </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                  AI Intelligence
                </span>
              </h1>

              {/* Description */}
              <p className="text-gray-300 text-lg sm:text-xl mb-8 sm:mb-12 leading-relaxed">
                Experience the future of banking with our AI-driven solutions.
                Smart, secure, and perfectly tailored to your financial needs.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20 w-full sm:w-auto text-center"
                >
                  Get Started
                  <ChevronRight className="inline-block ml-2 w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium bg-white/10 text-white backdrop-blur-xl border border-white/20 w-full sm:w-auto text-center"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              style={{ y: parallaxY }}
              className="order-1 lg:order-2 relative w-full max-w-md mx-auto lg:mx-0" // Adjusted max-w
            >
              <div className="relative aspect-[4/3] lg:aspect-[3/4] w-full overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-3xl"></div>
                <img
                  src="vecteezy_businessman-raise-the-budget-the-concept-of-increasing_7278452.jpg"
                  alt="AI Banking Platform"
                  className="w-full h-full object-cover object-center rounded-2xl transform transition-transform duration-500 hover:scale-105"
                />
                {/* Decorative elements */}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl"></div>
              </div>
              {/* Glass effect card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute -bottom-4 left-4 right-4 bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-white/90 text-sm">
                    AI-Powered Security Active
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20">
        <div className="container px-5 mx-auto">
          <div className="flex flex-wrap w-full mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 w-full mb-6 lg:mb-0"
            >
              <h2 className="sm:text-4xl text-3xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                  Cutting-Edge Features
                </span>
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded animate-pulse"></div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 w-full leading-relaxed text-gray-300"
            >
              Our AI-powered platform provides comprehensive tools for secure,
              efficient, and personalized banking experience.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-4"
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-white/10 backdrop-blur-md p-6 rounded-xl transition-all duration-500 group relative overflow-hidden h-full"
                >
                  {/* Gradient border effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>

                  {/* Icon container */}
                  <div className="w-16 h-16 mb-4 relative">
                    <div
                      className={`absolute inset-0 ${feature.glowColor} rounded-full blur-lg transform group-hover:scale-150 transition-transform duration-500`}
                    ></div>
                    <div className="relative z-10">{feature.icon}</div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl text-white font-medium mb-2 relative z-10">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 relative z-10">
                    {feature.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/5 backdrop-blur-lg border-t border-white/10">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Info */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">fAInance</h3>
              <p className="text-gray-300">Transforming banking with AI</p>
            </div>

            {/* Quick Links */}
            {["Company", "Products", "Resources"].map((section, index) => (
              <div key={index}>
                <h4 className="text-lg font-semibold text-white mb-4">
                  {section}
                </h4>
                <ul className="space-y-2">
                  {["About", "Features", "Contact", "Support"].map(
                    (item, idx) => (
                      <li key={idx}>
                        <a
                          href="#"
                          className="text-gray-300 hover:text-purple-400 transition-colors"
                        >
                          {item}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 mt-12 pt-8">
            <p className="text-center text-gray-400">
              © 2025 fAInance™. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
