import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import About from "./Components/About";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import Projects from "./Components/Projects";
import Technologies from "./Components/Technologies";
import ComingSoonPopup from "./Components/ComingSoonPopup";
import ChatBot from "./Components/ChatBot";
import Footer from "./Components/Footer";
import EmailForm from "./Components/EmailForm";

function App() {
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const [isEmailFormOpen, setIsEmailFormOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    if (isChatBotOpen || isEmailFormOpen || isComingSoonOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isChatBotOpen, isEmailFormOpen, isComingSoonOpen]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div
      className={`overflow-x-hidden antialiased transition-colors duration-700 ease-in-out selection:bg-cyan-300 selection:text-cyan-900 
        ${theme === "dark" ? "text-neutral-300" : "text-neutral-800"}
      `}
    >
      {/* Smooth Background */}
      <div className="fixed top-0 -z-10 h-full w-full transition-colors duration-700 ease-in-out">
        <div
          className={`absolute top-0 z-[-2] h-screen w-screen transition-colors duration-700 ease-in-out
          ${theme === "dark" 
            ? "bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
            : "bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(180,160,255,0.4),rgba(255,255,255,0))]"
          }`}
        ></div>
      </div>

      <div className="container mx-auto px-8">
        <Navbar setIsEmailFormOpen={ setIsEmailFormOpen } />
        
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="fixed top-4 right-4 flex items-center justify-center p-2 rounded-full shadow-md transition-all duration-300 hover:scale-110"
        >
          {theme === "dark" ? (
            <FaSun className="w-6 h-6 text-neutral-200" /> // White sun for dark mode
          ) : (
            <FaMoon className="w-6 h-6 text-neutral-900" /> // Dark moon for light mode
          )}
        </button>

        <Hero />
        <About />
        <Technologies />
        <Projects onMoreComingSoonClick={() => setIsComingSoonOpen(true)} theme={theme}/>
        <ChatBot
          onOpen={() => setIsChatBotOpen(true)}
          onClose={() => setIsChatBotOpen(false)}
        />
        <Footer setIsEmailFormOpen={ setIsEmailFormOpen } />
      </div>

      {isComingSoonOpen && (
        <ComingSoonPopup onClose={() => setIsComingSoonOpen(false)} theme={theme}/>
      )}

      {isEmailFormOpen && (
        <EmailForm setIsEmailFormOpen={ setIsEmailFormOpen } />
      )}
    </div>
  );
}

export default App;
