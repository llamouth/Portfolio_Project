import React from 'react';
import { PROJECTS } from '../constants';
import { motion } from 'motion/react';

const Projects = ({ onMoreComingSoonClick, theme }) => {
    const handleClick = (link) => { 
        window.open(link, '_blank');
    };

    return (
        <div className={`border-b pb-4 transition-colors duration-500 ${theme === "dark" ? "border-neutral-900" : "border-gray-300"}`}>
            <motion.h1 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.5 }}
                className={`my-20 text-center text-4xl transition-colors duration-500 ${theme === "dark" ? "text-neutral-300" : "text-neutral-800"}`}
            >
                Projects
            </motion.h1>

            <div>
                {PROJECTS.map((project, idx) => (
                    <div key={idx} className="mb-8 flex flex-wrap lg:justify-center">
                        {/* Project Image */}
                        <motion.div 
                            className="w-full lg:w-1/4"
                            whileInView={{ opacity: 1, x: 0 }}
                            initial={{ opacity: 0, x: -100 }}
                            transition={{ duration: 1 }}
                        >
                            <div 
                                className="w-[150px] h-[150px] hover:cursor-pointer hover:scale-110 transition-transform duration-300" 
                                onClick={() => handleClick(project.link)}
                            >
                                <img 
                                    src={project.image} 
                                    className="mb-6 rounded" 
                                    width={150} 
                                    height={150} 
                                    alt={project.title} 
                                />
                            </div>
                        </motion.div>

                        {/* Project Details */}
                        <motion.div 
                            className="w-full max-w-xl lg:w-3/4"
                            whileInView={{ opacity: 1, x: 0 }}
                            initial={{ opacity: 0, x: 100 }}
                            transition={{ duration: 1 }}
                        >
                            <h6 className={`mb-2 font-semibold transition-colors duration-500 ${theme === "dark" ? "text-neutral-300" : "text-neutral-800"}`}>
                                {project.title}
                            </h6>
                            <p className={`mb-4 transition-colors duration-500 ${theme === "dark" ? "text-neutral-400" : "text-gray-600"}`}>
                                {project.description}
                            </p>

                            {/* Technologies */}
                            <div className="flex flex-wrap mt-4 gap-2">
                                {project.technologies.map((tech, idx) => (
                                    <span
                                        key={idx}
                                        className={`rounded px-2 py-1 text-sm font-medium transition-colors duration-500 ${theme === "dark" ? "bg-neutral-900 text-purple-400" : "bg-gray-200 text-purple-800"}`}
                                    >
                                    {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* More Coming Soon */}
            <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 100 }}
                transition={{ duration: 0.5 }}
                className={`my-20 text-center text-2xl cursor-pointer hover:animate-pulse transition-colors duration-500 
                    ${theme === "dark" ? "text-neutral-500" : "text-gray-500"}`}
                onClick={onMoreComingSoonClick}
            >
                More Coming Soon...
            </motion.div>
        </div>
    );
};

export default Projects;
