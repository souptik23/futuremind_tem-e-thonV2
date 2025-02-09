import React, { useState, useEffect } from "react";
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const CreditCardSection = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const [cardHolderName, setCardHolderName] = useState("CARD HOLDER NAME");
  const [cardType, setCardType] = useState("premium");
  const [cardBackground, setCardBackground] = useState("");
  const [cardTypeDisplay, setCardTypeDisplay] = useState("Premium Rewards Card");
  const [customUploadVisible, setCustomUploadVisible] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // Predefined skins with online image URLs
  const predefinedSkins = {
    premium: {
      background: "bg-gradient-to-r from-yellow-600 to-yellow-400",
      text: "Premium Rewards Card",
      image: "https://digitalsynopsis.com/wp-content/uploads/2017/07/beautiful-color-ui-gradients-backgrounds-purple-love.png",
    },
    anime: {
      background: null,
      text: "Anime Collection Card",
      image: "https://cdn.magicdecor.in/com/2023/10/20183405/Naruto-Anime-Wallpaper-for-Walls-M-710x488.jpg",
    },
    sports: {
      background: null,
      text: "Sports Edition Card",
      image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BvcnRzJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    cars: {
      background: null,
      text: "Sports Cars Edition",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FycyUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    },
    nature: {
      background: null,
      text: "Nature Series Card",
      image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    custom: {
      background: "bg-gradient-to-r from-blue-600 to-purple-600",
      text: "Custom Design Card",
      image: null,
    },
  };

  useEffect(() => {
    updateCardStyle(cardType);
  }, [cardType]);

  const updateCardStyle = (selectedCardType) => {
    setCardType(selectedCardType);
    setCardTypeDisplay(predefinedSkins[selectedCardType].text);
    setCustomUploadVisible(selectedCardType === "custom");

    if (predefinedSkins[selectedCardType].image) {
      setCardBackground(`url('${predefinedSkins[selectedCardType].image}')`);
    } else {
      setCardBackground(predefinedSkins[selectedCardType].background);
    }
  };

  const handleCustomImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // Allow only images
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        setCardBackground(`url('${e.target.result}')`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCardFlip = () => {
    setIsFlipped(true); // Flip to the back side
    setTimeout(() => {
      setIsFlipped(false); // Flip back to the front side after 3 seconds
    }, 3000);
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap items-center">
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
            <div className="relative">
              <h2 className="text-4xl font-bold text-white mb-6">
                {t.designYourCard}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                  {t.createPersonalized}
                </span>
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Create a personalized credit card that matches your style.
                Choose from exclusive designs or upload your own image.
              </p>

              {/* 2D Card Design with Flip Animation */}
              <div
                className={`w-96 h-56 mx-auto perspective-1000 cursor-pointer ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
                onClick={handleCardFlip}
              >
                <div
                  className={`relative w-full h-full transform-style-preserve-3d transition-transform duration-500 ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                >
                  {/* Front Side of the Card */}
                  <div
                    className="absolute w-full h-full bg-cover bg-center rounded-2xl shadow-2xl flex flex-col justify-end p-4 text-white"
                    style={{
                      backgroundImage: cardBackground,
                    }}
                  >
                    <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>
                    <div className="relative z-10">
                      <div className="text-xl font-mono">**** **** **** 1234</div>
                      <div className="flex justify-between">
                        <span>{cardHolderName}</span>
                        <span>12/25</span>
                      </div>
                      <div className="text-sm font-medium">{cardTypeDisplay}</div>
                    </div>
                  </div>

                  {/* Back Side of the Card (CVV Side) */}
                  <div
                    className="absolute w-full h-full bg-gray-800 rounded-2xl shadow-2xl transform rotate-y-180 backface-hidden"
                  >
                    <div className="w-full h-full p-4 flex flex-col justify-between">
                      <div className="w-full h-8 bg-gray-700 rounded-lg"></div>
                      <div className="text-right text-white">
                        <div className="text-sm">CVV</div>
                        <div className="text-xl font-mono">***</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 lg:pl-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setCardHolderName(e.target.value || "CARD HOLDER NAME")
                    }
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-600 text-white"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Card Theme
                  </label>
                  <select
                    onChange={(e) => updateCardStyle(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
                  >
                    <option value="premium">Classic Premium</option>
                    <option value="anime">Anime Collection</option>
                    <option value="sports">Sports Edition</option>
                    <option value="cars">Sports Cars</option>
                    <option value="nature">Nature Series</option>
                    <option value="custom">Custom Design</option>
                  </select>
                </div>

                {customUploadVisible && (
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Upload Custom Image
                    </label>
                    <input
                      type="file"
                      className="w-full text-white"
                      onChange={handleCustomImage}
                    />
                  </div>
                )}

                <button className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">
                  Create My Card
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreditCardSection;