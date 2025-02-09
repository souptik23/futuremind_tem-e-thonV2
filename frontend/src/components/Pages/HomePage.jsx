import React, { useState } from "react";
import AIBankingSection from "../AiBankingSection";
import ChatApp from "../Chatapp";
import CreditCardSection from "../CreditCardSection";
import FAQSection from "../FAQSection";
import FeatureSectionWithAI from "../Featuresectionwithai";
import Herosection from "../Herosection";
import LoanServicesSection from "../LoanServicesSection";
import "./HomePage.css";

function Home() {
  // Add chat modal state here
  const [chatAppOpen, setChatAppOpen] = useState(false);

  return (
    <>
      <Herosection />
      {/* <FeatureSectionWithAI /> */}
      <AIBankingSection />
      <LoanServicesSection />
      <CreditCardSection />
      <FAQSection setChatAppOpen={setChatAppOpen} />
      {/* Pass isOpen and its setter to ChatApp */}
      <ChatApp isOpen={chatAppOpen} setIsOpen={setChatAppOpen} />
      <div>
        <footer class="bg-white  shadow-sm dark:bg-gray-900 mt-3">
          <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div class="sm:flex sm:items-center sm:justify-between">
              <a
                href=""
                class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
              >
                <img
                  src=""
                  class="h-8"
                  alt="Logo"
                />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  fAInance
                </span>
              </a>
              <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                  <a href="#" class="hover:underline me-4 md:me-6">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:underline me-4 md:me-6">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:underline me-4 md:me-6">
                    Licensing
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2025{" "}
              <a href="https://flowbite.com/" class="hover:underline">
                fAInance™
              </a>
              . All Rights Reserved.
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Home;
