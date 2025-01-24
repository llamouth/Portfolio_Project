import budgetYaSelfImage from '../assets/projects/Budgetyaselflogo.png'
import yumStepperImage from '../assets/projects/Yumstepperlogo.png'

export const HERO_CONTENT = `Hello! I'm a dedicated full stack developer with a flair for creating web applications that are not only functional but also enjoyable to navigate. My journey has involved extensive work with front-end technologies such as React, React Native, and Next.js, alongside back-end frameworks like Node.js and Express, using PostgreSQL as my database of choice. My goal is to blend creativity with technical know-how to develop innovative solutions that truly make an impact—be it advancing business objectives or elevating user experiences. Let’s collaborate to build something exceptional together!`;

export const ABOUT_TEXT = `As a dynamic and enthusiastic full stack developer, I take pride in crafting efficient, user-centric web applications. My path in tech was ignited by a deep curiosity about how things function, leading me to an immersive boot camp that transformed that curiosity into a genuine passion for web development. I thrive in collaborative settings, love tackling intricate challenges, and am committed to delivering top-notch solutions. When I'm not immersed in code, you can find me making music, delving into emerging technologies, or exploring new destinations.`;


export const EXPERIENCES = [,
  {
    year: "2022 - 2023",
    role: "Boiler Technician",
    company: "Boiler Room Rentals",
    description: `Developed systematic workflows to optimize pipe installation and equipment repair processes. Designed solutions to reduce downtime and ensure precision in system measurements and operations, showcasing problem-solving and process optimization skills applicable to software engineering.`,
    technologies: ["Process Optimization", "Technical Problem-Solving"],
  },
  {
    year: "2021 - 2022",
    role: "Caretaker X",
    company: "New York City Housing Authority",
    description: `Utilized systematic problem-solving to improve operational efficiency and building functionality. Coordinated tasks and resources effectively, reflecting the ability to manage complex projects and prioritize tasks in dynamic environments.`,
    technologies: ["Project Coordination", "Task Optimization"],
  },
  {
    year: "2018 - 2020",
    role: "Concierge",
    company: "Lelazarian Properties",
    description: `Streamlined resident services through effective use of data management tools, ensuring timely reporting and process adherence. Improved user satisfaction by implementing efficient workflows and personalized customer experiences.`,
    technologies: ["Data Management", "Workflow Optimization", "Customer Service"],
  },
];


export const PROJECTS = [
  {
    title: "YumStepper",
    image: yumStepperImage, // Replace with the appropriate image variable or path
    description:
      "YumStepper is a fitness and rewards mobile app that motivates users to stay active by tracking steps and earning points redeemable for restaurant discounts. The app features real-time geolocation, dynamic maps, and a rewards system to promote healthy habits and enhance user engagement.",
    technologies: ["React Native (Expo)", "Node.js", "Express", "PostgreSQL"],
  }
  ,
  {
    title: "BudgetYaself",
    image: budgetYaSelfImage, 
    description:"BudgetYaself is a smart budgeting application designed to help users track their expenses, manage finances, and make informed decisions. Leveraging AI-powered insights, it offers personalized strategies to optimize your budget and achieve financial goals seamlessly.",
    technologies: ["React", "Node.js", "SCSS", "PostgreSQL", "Bootstrap", "Express"],
  },
  {
    title: "Portfolio Website",
    // image: project3,
    description:
      "A personal portfolio website showcasing projects, skills, and contact information.",
    technologies: ["HTML", "SCSS", "React", "Bootstrap"],
  },
  {
    title: "Blogging Platform",
    // image: project4,
    description:
      "A platform for creating and publishing blog posts, with features like rich text editing, commenting, and user profiles.",
    technologies: ["HTML", "CSS", "Vue.js", "Express", "mySQL"],
  },
];

export const CONTACT = {
  github: "https://github.com/llamouth?tab=repositories",
  linkedin: "https://www.linkedin.com/in/larryalamouth/",
  email: "llamouth@pursuit.org",
};
