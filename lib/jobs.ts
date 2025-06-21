// lib/jobs.ts
export const jobsData = {
  "positions": [
    {
      "id": "ai-data-engineer",
      "title": "AI/Data Engineer",
      "department": "Engineering",
      "type": "Full-time" as const,
      "level": "Mid" as const,
      "location": "Remote (Global)",
      "description": "Build and deploy machine learning models and data pipelines. Work with cutting-edge AI technologies to solve complex business problems and drive innovation.",
      "requirements": [
        "3+ years of experience in data engineering or machine learning",
        "Proficiency in Python, SQL, and cloud platforms",
        "Experience with ML frameworks like TensorFlow or PyTorch",
        "Strong understanding of data pipelines and ETL processes"
      ],
      "benefits": [
        "Work with latest AI technologies",
        "Conference and training budget",
        "Flexible working hours",
        "Mentorship opportunities"
      ],
      "skills": ["Python", "Machine Learning", "SQL", "TensorFlow", "AWS", "Data Pipelines"],
      "featured": true
    },
    {
      "id": "full-stack-developer",
      "title": "Full-Stack Developer",
      "department": "Engineering",
      "type": "Full-time" as const,
      "level": "Mid" as const,
      "location": "Remote (Global)",
      "description": "Develop end-to-end web applications using modern technologies. Work on both frontend and backend systems while collaborating with design and product teams.",
      "requirements": [
        "3+ years of full-stack development experience",
        "Proficiency in React, Next.js, and Node.js",
        "Experience with TypeScript and modern databases",
        "Strong problem-solving and communication skills"
      ],
      "benefits": [
        "Latest development tools",
        "Professional growth opportunities",
        "Health insurance coverage",
        "Annual team retreats"
      ],
      "skills": ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "REST APIs"],
      "featured": true
    },
    {
      "id": "growth-marketer",
      "title": "Growth Marketer",
      "department": "Marketing",
      "type": "Full-time" as const,
      "level": "Mid" as const,
      "location": "Remote (Global)",
      "description": "Drive user acquisition and revenue growth through data-driven marketing strategies. Optimize conversion funnels and scale marketing campaigns across multiple channels.",
      "requirements": [
        "3+ years of growth marketing or digital marketing experience",
        "Experience with analytics tools and A/B testing",
        "Knowledge of SEO, SEM, and social media marketing",
        "Strong analytical and creative problem-solving skills"
      ],
      "benefits": [
        "Marketing tools and software budget",
        "Performance-based incentives",
        "Conference and networking events",
        "Creative freedom and autonomy"
      ],
      "skills": ["Digital Marketing", "Analytics", "SEO", "A/B Testing", "Growth Hacking", "Content Strategy"],
      "featured": true
    },
    {
      "id": "senior-full-stack",
      "title": "Senior Full-Stack Developer",
      "department": "Engineering",
      "type": "Full-time" as const,
      "level": "Senior" as const,
      "location": "Remote (Global)",
      "description": "Lead development of complex web applications using modern technologies. Mentor junior developers and contribute to architectural decisions.",
      "requirements": [
        "5+ years of full-stack development experience",
        "Expert in React, Next.js, and Node.js",
        "Experience with TypeScript and modern databases",
        "Strong problem-solving and communication skills"
      ],
      "benefits": [
        "Flexible working hours",
        "Health insurance coverage",
        "Annual learning budget",
        "Company retreat"
      ],
      "skills": ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL"],
      "featured": false
    },
    {
      "id": "ui-ux-designer",
      "title": "UI/UX Designer",
      "department": "Design",
      "type": "Full-time" as const,
      "level": "Mid" as const,
      "location": "Remote (Global)",
      "description": "Create beautiful, user-centered designs for web and mobile applications. Work closely with development teams to ensure pixel-perfect implementation.",
      "requirements": [
        "3+ years of UI/UX design experience",
        "Proficiency in Figma and design systems",
        "Strong portfolio showcasing web/mobile designs",
        "Understanding of frontend development principles"
      ],
      "benefits": [
        "Design conference tickets",
        "Creative software licenses",
        "Flexible PTO",
        "Remote work stipend"
      ],
      "skills": ["Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
      "featured": false
    },
    {
      "id": "devops-engineer",
      "title": "DevOps Engineer",
      "department": "Engineering",
      "type": "Full-time" as const,
      "level": "Mid" as const,
      "location": "Remote (Global)",
      "description": "Build and maintain scalable cloud infrastructure. Implement CI/CD pipelines and ensure system reliability and security.",
      "requirements": [
        "3+ years of DevOps/Cloud experience",
        "Experience with AWS/Azure and Docker",
        "Knowledge of Kubernetes and Infrastructure as Code",
        "Strong automation and scripting skills"
      ],
      "benefits": [
        "Cloud certification support",
        "Equipment allowance",
        "Professional development",
        "Performance bonuses"
      ],
      "skills": ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
      "featured": false
    },
    {
      "id": "mobile-developer",
      "title": "Mobile Developer",
      "department": "Engineering",
      "type": "Full-time" as const,
      "level": "Junior" as const,
      "location": "Remote (Global)",
      "description": "Develop cross-platform mobile applications using React Native. Work on exciting projects across various industries.",
      "requirements": [
        "2+ years of mobile development experience",
        "Proficiency in React Native or Flutter",
        "Understanding of mobile app lifecycle",
        "Experience with app store deployments"
      ],
      "benefits": [
        "Mentorship program",
        "Career growth opportunities",
        "Mobile device allowance",
        "Team building events"
      ],
      "skills": ["React Native", "JavaScript", "iOS", "Android", "Firebase"],
      "featured": false
    },
    {
      "id": "project-manager",
      "title": "Project Manager",
      "department": "Operations",
      "type": "Full-time" as const,
      "level": "Senior" as const,
      "location": "Remote (Global)",
      "description": "Lead cross-functional teams to deliver projects on time and within budget. Ensure quality and client satisfaction.",
      "requirements": [
        "4+ years of project management experience",
        "Experience with Agile/Scrum methodologies",
        "Strong communication and leadership skills",
        "PMP or similar certification preferred"
      ],
      "benefits": [
        "Leadership training",
        "Client interaction opportunities",
        "Certification support",
        "Performance incentives"
      ],
      "skills": ["Agile", "Scrum", "Jira", "Client Management", "Team Leadership"],
      "featured": false
    },
    {
      "id": "junior-frontend",
      "title": "Junior Frontend Developer",
      "department": "Engineering",
      "type": "Full-time" as const,
      "level": "Junior" as const,
      "location": "Remote (Global)",
      "description": "Build responsive, interactive user interfaces using modern frontend technologies. Perfect opportunity for career growth.",
      "requirements": [
        "1+ years of frontend development experience",
        "Proficiency in HTML, CSS, and JavaScript",
        "Experience with React or Vue.js",
        "Passion for learning and growth"
      ],
      "benefits": [
        "Comprehensive mentorship",
        "Fast-track career growth",
        "Learning resources",
        "Code review support"
      ],
      "skills": ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
      "featured": false
    }
  ]
};