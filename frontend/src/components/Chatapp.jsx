import React, { useState } from "react";

const ChatApp = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "👋 Welcome! I'm your banking assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const predefinedQueries = [
    { text: "How to open a bank account?", icon: "🏦" },
    { text: "How to get a credit card?", icon: "💳" },
    { text: "What are the interest rates for loans?", icon: "💰" },
    { text: "How to apply for a personal loan?", icon: "📝" },
  ];

  const formatResponse = (text) => {
    const lines = text.split("\n");
    return lines.map((line, index) => {
      if (line.match(/^\d+\.\s*\*\*/)) {
        const [number, ...rest] = line.split('.');
        const content = rest.join('.').trim().replace(/\*\*/g, '');
        const [title, ...description] = content.split(':');
        
        return (
          <div key={index} className="mb-4">
            <div className="flex items-start space-x-2">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm">
                {number}
              </span>
              <h4 className="font-semibold text-indigo-200">{title}</h4>
            </div>
            {description.length > 0 && (
              <p className="mt-1 ml-8 text-gray-300">{description.join(':')}</p>
            )}
          </div>
        );
      } 
      else if (line.startsWith("- ")) {
        return (
          <div key={index} className="flex items-start space-x-2 ml-8 mt-2">
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2"></span>
            <p className="text-gray-300">{line.replace("- ", "")}</p>
          </div>
        );
      }
      else if (line.trim()) {
        return <p key={index} className="text-gray-300 mt-2">{line}</p>;
      }
      return <div key={index} className="h-2"></div>;
    });
  };

  const sendMessage = async (message) => {
    const newUserMessage = { sender: "user", text: message };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInput("");
    setIsThinking(true);
    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const formattedResponse = formatResponse(data.response);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: formattedResponse },
      ]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: "Error communicating with the AI." },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="relative">
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 z-50"
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {/* Overlay for closing */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } z-40`}
        onClick={() => setIsOpen(false)}
      />

      {/* Chat Window */}
      <div
        className={`fixed top-1/2 right-6 -translate-y-1/2 w-[32rem] max-w-[90vw] bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl shadow-2xl transform transition-all duration-500 ease-in-out ${
          isOpen ? "translate-x-0 opacity-100 z-50" : "translate-x-10 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between bg-gray-800/50 rounded-t-2xl backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <h3 className="text-white font-medium">Banking Assistant</h3>
          </div>
          
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            🔍
          </button>
        </div>

        {/* Search Bar */}
        <div className={`transition-all duration-300 ${isSearchOpen ? 'h-12' : 'h-0'} overflow-hidden`}>
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full p-3 bg-gray-800 text-white border-b border-gray-700 focus:outline-none"
          />
        </div>

        {/* Messages */}
        <div className="h-[28rem] max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-700/80 backdrop-blur-sm"
                }`}
              >
                {typeof msg.text === "string" ? (
                  <p className="text-sm text-gray-100">{msg.text}</p>
                ) : (
                  <div className="space-y-1">{msg.text}</div>
                )}
              </div>
            </div>
          ))}
          
          {isThinking && (
            <div className="flex justify-start">
              <div className="bg-gray-700/80 backdrop-blur-sm rounded-2xl p-4 flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Queries */}
        <div className="p-4 border-t border-gray-700/50">
          <div className="flex flex-wrap gap-2">
            {predefinedQueries.map((query, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(query.text)}
                className="flex items-center space-x-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white text-sm px-3 py-1.5 rounded-full transition-colors duration-300 transform hover:scale-105"
              >
                <span>{query.icon}</span>
                <span>{query.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-700/50 rounded-b-2xl">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-700/80 backdrop-blur-sm text-white placeholder-gray-400 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onKeyPress={(e) => e.key === "Enter" && input.trim() && sendMessage(input)}
            />
            <button
              onClick={() => input.trim() && sendMessage(input)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-xl transition-colors duration-300"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;