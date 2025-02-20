import React, { useState } from "react";
import { FaPaperPlane, FaRobot, FaUser, FaTimes } from "react-icons/fa";

const baseURL = "https://api.aimlapi.com/v1";
const apiKey = import.meta.env.VITE_AI_API_KEY;
const systemPrompt = `
You are an AI assistant that helps answer questions about Larry Lamouth, a full-stack developer.
Larry is skilled in **JavaScript, React, Node.js, Express, SQL, Tailwind, and Cybersecurity**.
He has worked on multiple full-stack applications and APIs, including:

1️⃣ **YumStepper** - A step-tracking app that rewards users for walking to restaurants.
2️⃣ **Ausome** - A social media app designed for spectrum users, providing a safe and inclusive space for communication and resources.
3️⃣ **Battleship AI Game** - A PERN stack game where AI generates life scenarios, integrating Claude AI for interactive storytelling.
4️⃣ **RateLimiter API** - A secure Express middleware that prevents abuse by limiting requests to APIs.

Larry is a **Pursuit Fellow**, a fast learner, and passionate about problem-solving.
His email is **llamouth@pursuit.org**.

Always respond in a **friendly, concise, and professional tone**.
If someone asks about **skills, experience, or projects**, provide detailed and helpful responses.
`;

const Chatbot = () => {
  const [messages, setMessages] = useState([{ role: "system", content: systemPrompt }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];

    try {
      const response = await fetch(`${baseURL}/chat/completions`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/Mistral-7B-Instruct-v0.2",
          messages: newMessages,
          temperature: 0.7,
          max_tokens: 256,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const data = await response.json();
      const botMessage = data.choices[0].message;

      setMessages([...newMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <div className="fixed bottom-28 right-10 z-50">
      {/* Chatbot Toggle Button */}
      {!isOpen &&
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all"
        >
          💬
        </button>
      }
      

      {/* Chatbox Container */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-96 max-w-full shadow-2xl rounded-xl overflow-hidden">
          {/* Background Effect */}
          <div className="absolute top-0 z-[-2] h-full w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

          {/* Chat Header */}
          <div className="bg-blue-700 text-white py-3 px-4 flex justify-between items-center">
            <span className="font-semibold text-lg">Larry's AI Assistant</span>
            <button onClick={() => setIsOpen(false)} className="text-white text-xl">
              <FaTimes />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-3 backdrop-blur-md bg-opacity-60 rounded-lg">
            {messages.slice(1).map((msg, index) => (
              <div key={index} className={`flex items-start ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`relative max-w-[75%] px-4 py-2 rounded-lg shadow-md ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-800 text-white rounded-bl-none"
                }`}>
                  {msg.role === "user" ? <FaUser className="absolute -top-4 right-2 text-gray-300" /> : <FaRobot className="absolute -top-4 left-2 text-gray-300" />}
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="flex items-center p-3 bg-gray-900 rounded-b-xl border-t border-gray-700">
            <input
              type="text"
              className="flex-1 p-2 border-none bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ask me something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={handleSendMessage}
              disabled={loading}
              className="ml-3 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? "..." : <FaPaperPlane />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
