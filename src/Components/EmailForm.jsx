import React, { useState, useEffect, useRef, useCallback } from 'react'
import emailjs from "emailjs-com";
import { motion, AnimatePresence } from "motion/react";
import { FaTimes } from "react-icons/fa";

const FIELD_NAMES = {
  name: "from_name",
  email: "reply_to",
  message: "message",
};

const EmailForm = ({ setIsEmailFormOpen }) => {

  const formRef = useRef();
  const { VITE_EMAIL_SERVICE_ID, VITE_EMAIL_TEMPLATE_ID, VITE_EMAIL_USER_ID } = import.meta.env;
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        VITE_EMAIL_SERVICE_ID,
        VITE_EMAIL_TEMPLATE_ID,
        formRef.current,
        VITE_EMAIL_USER_ID
      )
      .then(
        (result) => {
          console.log("Email sent:", result.text);
          setFeedback("Message sent successfully!");
          formRef.current.reset();
        },
        (error) => {
          console.error("Error sending email:", error.text);
          setFeedback("Failed to send message. Please try again.");
        }
      )
      .finally(() => {
        setLoading(false);
        setTimeout(() => {
          setFeedback("");
          setIsEmailFormOpen(false);
        }, 1000);
      });
  };

  const handleClose = useCallback(() => setIsEmailFormOpen(false), []);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-lg transition-opacity">
        <motion.div
          className="relative w-[90%] max-w-2xl bg-gray-900 shadow-2xl rounded-xl overflow-hidden border border-neutral-500"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="bg-neutral-800 text-white py-3 px-4 flex justify-between items-center border-b border-neutral-500">
            <span className="font-semibold text-lg">Leave a Message</span>
            <button onClick={handleClose} className="text-white text-xl hover:cursor-pointer">
              <FaTimes />
            </button>
          </div>

          {/* Form */}
          <form ref={formRef} onSubmit={sendEmail} className="p-4 space-y-4 bg-neutral-900 rounded-lg bg-opacity-90">
            <div>
              <label className="block text-gray-300 mb-2" htmlFor={FIELD_NAMES.name}>
                Your Name
              </label>
              <input
                type="text"
                id={FIELD_NAMES.name}
                name={FIELD_NAMES.name}
                className="w-full p-3 bg-neutral-800 text-white border border-neutral-600 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2" htmlFor={FIELD_NAMES.email}>
                Your Email
              </label>
              <input
                type="email"
                id={FIELD_NAMES.email}
                name={FIELD_NAMES.email}
                className="w-full p-3 bg-neutral-800 text-white border border-neutral-600 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2" htmlFor={FIELD_NAMES.message}>
                Your Message
              </label>
              <textarea
                id={FIELD_NAMES.message}
                name={FIELD_NAMES.message}
                rows="4"
                className="w-full p-3 bg-neutral-800 text-white border border-neutral-600 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:outline-none"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 bg-neutral-700 text-white rounded-lg hover:bg-neutral-800 transition-all disabled:bg-gray-400"
            >
              {loading ? "Sending..." : "Submit"}
            </button>
            {feedback && <p className="mt-4 text-center text-green-500">{feedback}</p>}
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default EmailForm;
