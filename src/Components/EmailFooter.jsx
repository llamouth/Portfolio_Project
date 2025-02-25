import React from "react";

const EmailFooter = ({ setIsEmailFormOpen }) => {
  
  const handleOpen = () => {
    setIsEmailFormOpen(true);
  }

  return (
    <div>
      
      <button
        onClick={handleOpen}
        className="px-4 py-2 border border-neutral-700  hover:bg-neutral-800 hover:text-white rounded-lg transition"
      >
        Leave a message
      </button>
      
    </div>
  );
};

export default EmailFooter;
