import React from 'react'
import logo from '../assets/LarryLamouthLogo.png'
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'

const Navbar = () => {
    return (
        <nav className='w-full mb-20 flex items-center justify-between py-6'>
            <div className='flex flex-shrink-0 items-center'>
                <img className='mx-2 w-36' src={logo} alt="logo" />
            </div>
            <div className='m-8 flex items-center justify-center gap-4 text-2xl'>
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
        </nav>
    )
}

export default Navbar
