import React from 'react';
import EmailFooter from './EmailFooter';

const Footer = ({ setIsEmailFormOpen }) => {
    return (
        <footer className="py-6 border-t border-neutral-700">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                {/* Left Section - Copyright */}
                <p className="text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} Larry Lamouth. All rights reserved.</p>

                {/* Review Button - Keep Pop-Up Functionality */}
                <div className="flex justify-center">
                    <EmailFooter setIsEmailFormOpen={ setIsEmailFormOpen } />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
