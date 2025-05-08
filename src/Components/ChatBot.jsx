import React, { useState, useCallback, useEffect } from "react";
import { FaPaperPlane, FaRobot, FaUser, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";
import knowledge from "../assets/larry_knowledge.json";
import useEnterSubmit from "../Hooks/useEnterSubmit";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY; // Ensure your API key is in your environment variables

const Chatbot = ({ onOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [genAI, setGenAI] = useState(null);
  const modelName = "gemini-1.5-flash"; // Or "gemini-pro-vision"

  useEffect(() => {
    if (apiKey) {
      setGenAI(new GoogleGenerativeAI(apiKey));
    } else {
      console.error("GOOGLE_API_KEY is not set in environment variables.");
    }
  }, [apiKey]);

  const handleSendMessage = async () => {
    if (!input.trim() || !genAI) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setShowTyping(true);

    const systemKnowledge = `You are an AI assistant with knowledge about Larry Lamouth. Use this to answer briefly **3-4 sentences 5 sentences MAX** and engagingly: ${JSON.stringify(knowledge)}`;

    const chat = genAI.getGenerativeModel({ model: modelName }).startChat({
      history: messages.map(msg => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      })),
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 200,
      },
    });

    try {
      const result = await chat.sendMessage(systemKnowledge + "\n\n" + input);
      const response = await result.response;

      setShowTyping(false);

      if (!response?.candidates || response.candidates.length === 0 || !response.candidates[0]?.content?.parts || response.candidates[0].content.parts.length === 0) {
        throw new Error("No valid response from Gemini");
      }

      const botMessage = {
        role: "assistant",
        content: response.candidates[0].content.parts[0].text.trim(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching Gemini response:", error);
    } finally {
      setShowTyping(false);
    }

    setLoading(false);
  };

  const handleKeyPress = useEnterSubmit(handleSendMessage);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    onOpen?.();
  }, [onOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  return (
    <div>
      {!isOpen && (
        <motion.button
          onClick={handleOpen}
          className="fixed bottom-10 left-10 z-50 p-4 border-2 border-neutral-800 text-neutral-800 rounded-full shadow-lg hover:bg-neutral-800 hover:text-white transition-all hover:scale-110"
        >
          <FaRobot className=" text-2xl " />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-lg transition-opacity"
          >
            <motion.div
              className="relative w-[90%] max-w-2xl bg-gray-900 shadow-2xl rounded-xl overflow-hidden border border-neutral-500"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Header */}
              <div className="bg-neutral-800 text-white py-3 px-4 flex justify-between items-center border-neutral-500">
                <span className="font-semibold text-lg">
                  Larry's AI Assistant
                </span>
                <button onClick={handleClose} className="text-white text-xl hover:cursor-pointer">
                  <FaTimes />
                </button>
              </div>

              {/* Messages */}
              <div className="relative h-96 overflow-y-auto p-4 pt-7 space-y-3 bg-neutral-900 rounded-lg bg-opacity-90 ">
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-start ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`relative max-w-[90%] px-4 py-2 rounded-lg shadow-md break-words ${
                        msg.role === "user"
                          ? "bg-neutral-700 text-white rounded-br-none"
                          : "bg-neutral-800 text-white rounded-bl-none"
                      } mb-4` }
                    >
                      {msg.role === "user" ? (
                        <FaUser className="absolute -top-5 right-2 text-gray-300" />
                      ) : (
                        <FaRobot className="absolute -top-5 left-2 text-gray-300" />
                      )}
                      <p className="text-sm whitespace-pre-line">{msg.content}</p>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {showTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: "mirror",
                    }}
                    className="flex items-center space-x-2 ml-2"
                  >
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-400"></div>
                  </motion.div>
                )}
              </div>

              {/* Input Box */}
              <div className="flex items-center p-3 bg-neutral-800 border-t border-neutral-500">
                <input
                  type="text"
                  className="flex-1 p-3 border-none bg-neutral-900 bg-opacity-60 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500"
                  placeholder="Ask me something..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={loading}
                  className="ml-3 p-3 bg-neutral-700 text-white rounded-full hover:bg-neutral-900 disabled:bg-gray-400"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;