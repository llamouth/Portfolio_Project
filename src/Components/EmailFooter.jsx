import React, { useState, useEffect } from "react";

const phrases = ["message", "suggestion", "comment", "request"];

const EmailFooter = ({ setIsEmailFormOpen }) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const typingSpeed = 100; // Speed of typing
  const deletingSpeed = 50; // Speed of deleting
  const delayBetweenWords = 1000; // Delay before deleting

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];

    if (isDeleting) {
      // Deleting effect
      if (charIndex > 0) {
        setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, deletingSpeed);
      } else {
        // When deleting is done, switch to next word
        setIsDeleting(false);
        setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      }
    } else {
      // Typing effect
      if (charIndex < currentPhrase.length) {
        setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, typingSpeed);
      } else {
        // Pause before deleting
        setTimeout(() => setIsDeleting(true), delayBetweenWords);
      }
    }
  }, [charIndex, isDeleting]);

  const handleOpen = () => {
    setIsEmailFormOpen(true);
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className="px-4 py-2 border border-neutral-700 hover:bg-neutral-800 hover:text-white rounded-lg transition"
      >
        Leave a {displayText}
        <span className="animate-blink">|</span>
      </button>

      <style>
        {`
          @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0; }
            100% { opacity: 1; }
          }
          
          .animate-blink {
            animation: blink 1s infinite;
            display: inline-block;
          }
        `}
      </style>
    </div>
  );
};

export default EmailFooter;
