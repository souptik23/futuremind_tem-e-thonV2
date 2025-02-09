import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { MessageCircle, Search, X, ChevronDown, ExternalLink } from 'lucide-react';
import ChatApp from './Chatapp';

const FAQSection = ({ setChatAppOpen }) => { // Receive setChatAppOpen as a prop
  const { language } = useLanguage();
  const t = translations[language];
  const [openFAQ, setOpenFAQ] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const faqs = [
    {
      question: t.cancelAnytime,
      answer: t.cancelAnytimeAnswer,
      icon: '💳'
    },
    {
      question: t.platformSecurity,
      answer: t.platformSecurityAnswer,
      icon: '🔒'
    },
    {
      question: t.accessAccount,
      answer: t.accessAccountAnswer,
      icon: '🔑'
    },
    {
      question: t.transferLimits,
      answer: t.transferLimitsAnswer,
      icon: '💸'
    }
  ];

  const [filteredFAQs, setFilteredFAQs] = useState(faqs);

  useEffect(() => {
    const filtered = faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFAQs(filtered);
  }, [searchQuery, t]);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="max-w-screen  px-4 py-16 sm:px-6 lg:px-8 mx-auto relative overflow-hidden bg-gray-900 min-h-screen">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Enhanced Search Section */}
      <div className="max-w-2xl mx-auto mb-16">
        <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : 'scale-100'}`}>
          <input
            type="text"
            placeholder={t.searchPlaceholder || "Search FAQs..."}
            className="w-full px-6 py-4 bg-gray-800/50 rounded-2xl text-white placeholder-gray-400 outline-none border-2 border-transparent focus:border-indigo-500 transition-all duration-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {/* Enhanced Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl mb-6">
          {t.faqTitle}{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 animate-gradient">
            {t.findAnswers}
          </span>
        </h2>
        <p className="mt-4 text-gray-400 text-lg">{t.everythingYouNeed}</p>
      </div>

      {/* Enhanced FAQ Grid */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {filteredFAQs.map((faq, index) => (
          <div
            key={index}
            className="group bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700/50 hover:border-indigo-500/50"
          >
            <button
              className="w-full flex items-center justify-between gap-4"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{faq.icon}</span>
                <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors text-left">
                  {faq.question}
                </h3>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                  openFAQ === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`mt-4 text-gray-400 overflow-hidden transition-all duration-300 ${
                openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced "Still Have Questions" Section */}
      <div className="mt-16 text-center">
        <button
          onClick={() => setChatAppOpen(true)} // Call setChatAppOpen(true)
          className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          <MessageCircle className="w-5 h-5 text-white animate-bounce" />
          <span className="text-white font-medium">{t.stillQuestions} Chat with our AI Assistant</span>
        </button>
      </div>
    </div>
  );
};

export default FAQSection;