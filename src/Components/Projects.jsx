import React from 'react'
import { PROJECTS } from '../constants'
import { motion } from 'motion/react'
const Projects = () => {
    return (
        <div className='border-b border-neutral-900 pb-4'>
            <motion.h1 
                whileInView={{opacity: 1, y: 0}}
                initial={{opacity: 0, y: -100}}
                transition={{duration: 0.5}}
                className='my-20 text-center text-4xl'
            >
                Projects
            </motion.h1>
            <div className="">
                {PROJECTS.map(( project, idx ) => (
                    <div key={idx} className="mb-8 flex flex-wrap lg:justify-center">
                        <motion.div 
                            className="w-full lg:w-1/4"
                            whileInView={{opacity: 1, x: 0}}
                            initial={{opacity: 0, x: -100}}
                            transition={{duration: 1}}
                        >
                            <img src={project.image} className='mb-6 rounded' width={150} height={150} alt={project.title} />
                        </motion.div>
                        <motion.div 
                            className="w-full max-w-xl lg:w-3/4"
                            whileInView={{opacity: 1, x: 0}}
                            initial={{opacity: 0, x: 100}}
                            transition={{duration: 1}}
                        >
                            <h6 className='mb-2 font-semibold'>{project.title}</h6>
                            <p className='mb-4 text-neutral-400'>{project.description}</p>
                            {project.technologies.map(( tech, idx ) => (
                                <span key={idx} className='mr-2 mt-4 rounded bg-neutral-900 px-2 py-1 text-sm font-medium text-purple-800'>{tech}</span>
                            ))}
                        </motion.div>
                    </div>
                ))}
            </div>
            <motion.div 
                whileInView={{opacity: 1, y: 0}}
                initial={{opacity: 0, y: 100}}
                transition={{duration: 0.5}}
                className='my-20 text-center text-2xl text-neutral-500'
            >
                More Coming Soon...
            </motion.div>
        </div>
    )
}

export default Projects
