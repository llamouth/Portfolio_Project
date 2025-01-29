import React from 'react'
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'
import { motion, AnimatePresence } from 'motion/react'

const ContactPopUp = ({ onClose }) => {
    return (
        <AnimatePresence>
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.8 }} 
                    transition={{ duration: 0.3 }} 
                    className='bg-white p-10 rounded-lg shadow-lg relative'
                >
                    <button 
                        onClick={onClose} 
                        className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
                    >
                        ✕
                    </button>
                    <h2 className='text-2xl font-bold mb-6'>Get in Touch</h2>
                    <div className='mt-6 flex items-center justify-center gap-6 text-2xl'>
                        <a href="https://www.linkedin.com/in/larryalamouth/" target="_blank" rel="noopener noreferrer" className='hover:text-blue-600'>
                            <FaLinkedin />
                        </a>
                        <a href="https://github.com/llamouth" target="_blank" rel="noopener noreferrer" className='hover:text-gray-800'>
                            <FaGithub />
                        </a>
                        <a href="mailto:llamouth@pursuit.org" target="_blank" rel="noopener noreferrer" className='hover:text-red-600'>
                            <FaEnvelope />
                        </a>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}

export default ContactPopUp
