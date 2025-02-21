import React, { useState, useEffect } from 'react'
import { CONTACT } from '../constants'
import { motion } from 'motion/react'
import ContactPopUp from './ContactPopUp'

const Contacts = () => {
  const [showButton, setShowButton] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setShowPopUp(true);
    }, 500); // Adjust the timeout as needed
  };

  const closePopUp = () => {
    setShowPopUp(false);
  };

  return (
    <div>
      {showButton && (
        <button 
          onClick={scrollToTop} 
          className='fixed bottom-10 right-10 p-3 border-2 border-neutral-800 text-neutral-800 rounded-full shadow-lg hover:bg-neutral-800 hover:text-white transition-all'
        >
          ↑ Contact 
        </button>
      )}
      {showPopUp && <ContactPopUp onClose={closePopUp} />}
    </div>
  )
}

export default Contacts
