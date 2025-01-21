import React from 'react'
import logo from '../assets/LarryLamouthLogo.png'
import { FaLinkedin } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'
import { FaEnvelope } from 'react-icons/fa'

const Navbar = () => {
    return (
        <nav className=' mb-20 flex items-center justify-between py-6'>
            <div className='flex flex-shrink-0 items-center'>
                <img className='mx-2 w-36' src={logo} alt="logo" />
            </div>
            <div className='m-8 flex items-center justify-center gap-4 text-2xl'>
                <a href="https://www.linkedin.com/in/larryalamouth/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                </a>
                <a href="https://github.com/llamouth" target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                </a>
                <a href="mailto:llamouth@pursuit.org" target="_blank" rel="noopener noreferrer">
                    <FaEnvelope />
                </a>
            </div>
        </nav>
    )
}

export default Navbar
