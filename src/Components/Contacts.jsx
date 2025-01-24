import React from 'react'
import { CONTACT } from '../constants'
import { motion } from 'motion/react'

const Contacts = () => {
  return (
    <div className='border-b border-neutral-900 pb-30'>
      <motion.h2 
        whileInView={{opacity: 1, y: 0}}
        initial={{opacity: 0, y: -100}}
        transition={{duration: 0.5}}
        className='my-10 text-center text-4xl'
      >
        Get in Touch
      </motion.h2>
      <div className="text-center tracking-tighter grid">
        <motion.div 
          whileInView={{opacity: 1, x: 0}}
          initial={{opacity: 0, x: -100}}
          transition={{duration: 0.5}}
          className='my-4'
        >
          <a href={CONTACT.linkedin}>LinkedIn</a>
        </motion.div>
        <motion.div 
          whileInView={{opacity: 1, x: 0}}
          initial={{opacity: 0, x: 100}}
          transition={{duration: 0.5, delay: 0.2}}
          className='my-4'
        >
          <a href={CONTACT.github}>Github</a>
        </motion.div>
        <motion.div 
          whileInView={{opacity: 1, x: 0}}
          initial={{opacity: 0, x: -100}}
          transition={{duration: 0.5, delay: 0.4}}
          className='my-4'
        >
          <a href={CONTACT.email}>Email</a>
        </motion.div>
      </div>
    </div>
  )
}

export default Contacts
