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
        <motion.div 
          whileInView={{opacity: 1, x: 0}}
          initial={{opacity: 0, x: -100}}
          transition={{duration: 1}}
          className="text-center tracking-tighter grid"
        >
            <a href={CONTACT.linkedin} className='my-4'>LinkedIn</a>
            <a href={CONTACT.github} className='my-4'>Github</a>
            <a href={CONTACT.email} className='my-4'>Email</a>
        </motion.div>
    </div>
  )
}

export default Contacts
