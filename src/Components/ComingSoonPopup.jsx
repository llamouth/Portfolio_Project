import React from 'react'
import { PROJECTS_SOON } from '../constants'
import { motion, AnimatePresence } from 'motion/react'

const ComingSoonPopup = ({ onClose }) => {
    return (
        <AnimatePresence>
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.8 }} 
                    transition={{ duration: 0.3 }} 
                    className='bg-neutral-950 p-10 rounded-lg shadow-lg relative bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'
                >
                    <button 
                        onClick={onClose} 
                        className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
                    >
                        ✕
                    </button>
                    <h2 className='text-2xl font-bold mb-6'>Coming Soon</h2>
                    <div className='mt-6'>
                        {PROJECTS_SOON.map((project, idx) => (
                            <div key={idx} className='mb-4'>
                                <h6 className='mb-2 font-semibold'>{project.title}</h6>
                                <p className='text-neutral-400'>{project.description}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}

export default ComingSoonPopup
