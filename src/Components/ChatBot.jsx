import React, { useState, useCallback } from "react";
import { FaPaperPlane, FaRobot, FaUser, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react"; // ✅ Correct import
import knowledge from "../assets/larry_knowledge.json";
import useEnterSubmit from "../Hooks/useEnterSubmit";

const baseURL = import.meta.env.VITE_AI_API_URL;
const apiKey = import.meta.env.VITE_AI_API_KEY;

const Chatbot = ({ onOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showTyping, setShowTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]); 
    setInput("");
    setShowTyping(true);

    const systemKnowledge = {
      role: "system",
      content: `You are an AI assistant with knowledge about Larry Lamouth. 
      Use this to answer briefly **3-4 sentences 5 sentences MAX** and engagingly: ${JSON.stringify(knowledge)}`,
    };

    const newMessages = [
      { role: "system", content: systemKnowledge.content },
      userMessage,
    ];

    try {
      const response = await fetch(`${baseURL}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/Mistral-7B-Instruct-v0.2",
          messages: newMessages,
          temperature: 0.7,
          max_tokens: 200,
        }),
      });

      setShowTyping(false);

      const data = await response.json();

      if (!data.choices || !data.choices[0]?.message?.content) {
        throw new Error("No valid response from AI");
      }

      const botMessage = {
        role: "assistant",
        content: data.choices[0].message.content.trim(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
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
              <div className="relative h-96 overflow-y-auto p-4 pt-7 space-y-3 bg-neutral-900 rounded-lg bg-opacity-90">
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
                      }`}
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

                {/* Typing Indicator (3 Animated Dots) */}
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
