// data/jobs.ts
import { JobDefinition } from '~/lib/scoring/types';

export const jobs: JobDefinition[] = [
    {
        id: 'ai-data-engineer',
        meta: {
            title: 'AI / Data Engineer',
            department: 'Engineering',
            type: 'Full-time',
            level: 'Mid',
            location: 'Remote (Global)',
            description: 'Build and deploy machine learning models and data pipelines. Work with cutting‑edge AI technologies to solve complex business problems.',
            featured: true,
        },

        requirements: [
            '3+ years of data engineering or machine learning experience',
            'Proficiency in Python, SQL, and cloud platforms (AWS/GCP/Azure)',
            'Experience with ML frameworks like TensorFlow, PyTorch, or Scikit-learn',
            'Strong understanding of data pipelines, ETL processes, and data architecture',
            'Experience with containerization (Docker) and orchestration tools',
        ],

        benefits: [
            'Work with latest AI technologies and cutting-edge projects',
            'Conference and training budget ($3,000/year)',
            'Flexible working hours and remote-first culture',
            'Mentorship opportunities with senior engineers',
            'Stock options and competitive salary',
        ],

        skills: [
            'Python', 'SQL', 'TensorFlow', 'PyTorch', 'Scikit-learn',
            'Apache Spark', 'Airflow', 'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure'
        ],

        // Generic evaluation criteria used by AI
        evaluationCriteria: {
            'Technical Depth': 'Real hands-on experience with ML frameworks, data engineering tools, proper technical terminology',
            'Project Complexity': 'End-to-end projects, scalability challenges, production deployment experience',
            'Business Impact': 'Quantifiable results, understanding of business context, problem-solving approach',
            'Communication': 'Clear explanations, structured thinking, professional presentation',
            'Authenticity': 'Realistic challenges, specific details that indicate genuine experience'
        },

        form: [
            /* ── PERSONAL ───────────────────────────────────────── */
            {
                id: 'firstName',
                label: 'First Name',
                type: 'text',
                required: true,
                weight: 5,
            },
            {
                id: 'lastName',
                label: 'Last Name',
                type: 'text',
                required: true,
                weight: 5,
            },
            {
                id: 'email',
                label: 'Email Address',
                type: 'email',
                required: true,
                weight: 5,
            },
            {
                id: 'portfolio',
                label: 'Portfolio or GitHub',
                description: 'Share your AI/ML projects, code repositories, or technical portfolio',
                type: 'url',
                required: true,
                weight: 15,
            },

            /* ── EXPERIENCE ─────────────────────────────────────── */
            {
                id: 'yearsExperience',
                label: 'Years of AI/Data Engineering Experience',
                type: 'select',
                options: ['Less than 1 year', '1-2 years', '3-4 years', '5-7 years', '8+ years'],
                required: true,
                weight: 15,
            },
            {
                id: 'techStack',
                label: 'AI/ML Technologies you use professionally',
                type: 'multiselect',
                options: [
                    'Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy',
                    'SQL', 'Apache Spark', 'Airflow', 'Docker', 'Kubernetes',
                    'AWS', 'GCP', 'Azure', 'MLflow', 'Jupyter'
                ],
                required: true,
                weight: {
                    kind: 'keyword',
                    value: 20,
                    keywords: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'AWS', 'Docker'],
                    minMatches: 3,
                },
            },
            {
                id: 'mlProjects',
                label: 'Describe 2-3 significant AI/ML projects you have built',
                description: 'Include: problem solved, data sources, models used, challenges overcome, deployment method, and business impact.',
                type: 'textarea',
                validation: { min: 600, max: 3000 },
                required: true,
                weight: {
                    kind: 'ai',
                    value: 30,
                    criteria: ['Technical Depth', 'Project Complexity', 'Business Impact', 'Communication'],
                },
            },

            /* ── CULTURE ────────────────────────────────────────── */
            {
                id: 'problemSolving',
                label: 'Describe your approach to solving complex data problems',
                description: 'Walk us through your methodology for tackling ambiguous data challenges.',
                type: 'textarea',
                validation: { min: 200, max: 1000 },
                required: true,
                weight: {
                    kind: 'ai',
                    value: 20,
                    criteria: ['Communication', 'Authenticity'],
                },
            },

            /* ── DOCUMENTS ──────────────────────────────────────── */
            {
                id: 'resume',
                label: 'Resume or CV',
                description: 'PDF preferred, max 5 MB',
                type: 'file',
                validation: { fileTypes: ['.pdf', '.doc', '.docx'], maxFileSize: 5 },
                required: true,
                weight: 12,
            },
        ],
    },

    {
        id: 'full-stack-developer',
        meta: {
            title: 'Full-Stack Developer',
            department: 'Engineering',
            type: 'Full-time',
            level: 'Mid',
            location: 'Remote (Global)',
            description: 'Develop end‑to‑end web applications using modern technologies. Work on both frontend and backend systems.',
            featured: true,
        },

        requirements: [
            '3+ years of full‑stack development experience',
            'Proficiency in React, Next.js, and Node.js',
            'Experience with TypeScript and modern databases',
            'Understanding of RESTful APIs and GraphQL',
            'Knowledge of modern deployment practices and CI/CD',
        ],

        benefits: [
            'Latest development tools and equipment',
            'Professional growth opportunities and mentorship',
            'Health insurance coverage',
            'Flexible working hours',
        ],

        skills: [
            'React', 'Next.js', 'Node.js', 'TypeScript', 'JavaScript',
            'PostgreSQL', 'MongoDB', 'REST APIs', 'GraphQL', 'Docker'
        ],

        evaluationCriteria: {
            'Technical Breadth': 'Full-stack capability, modern frameworks, database knowledge',
            'Project Complexity': 'Real-world applications, scalability, architecture decisions',
            'Code Quality': 'Testing, deployment, performance considerations',
            'Problem Solving': 'Challenges overcome, technical solutions, optimization',
            'Communication': 'Clear technical explanations, project presentation'
        },

        form: [
            {
                id: 'firstName',
                label: 'First Name',
                type: 'text',
                required: true,
                weight: 5,
            },
            {
                id: 'lastName',
                label: 'Last Name',
                type: 'text',
                required: true,
                weight: 5,
            },
            {
                id: 'email',
                label: 'Email Address',
                type: 'email',
                required: true,
                weight: 5,
            },
            {
                id: 'portfolio',
                label: 'Portfolio or Website',
                description: 'Show us your best development work with live demos',
                type: 'url',
                required: true,
                weight: 15,
            },
            {
                id: 'yearsExperience',
                label: 'Years of Full‑Stack Development',
                type: 'select',
                options: ['Less than 1 year', '1-2 years', '3-4 years', '5+ years'],
                required: true,
                weight: 15,
            },
            {
                id: 'techStack',
                label: 'Technologies you use professionally',
                type: 'multiselect',
                options: [
                    'React', 'Next.js', 'Vue.js', 'Node.js', 'Express.js', 'TypeScript',
                    'JavaScript', 'PostgreSQL', 'MongoDB', 'REST APIs', 'GraphQL',
                    'AWS', 'Docker', 'Git', 'Jest/Testing'
                ],
                required: true,
                weight: {
                    kind: 'keyword',
                    value: 20,
                    keywords: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'REST'],
                    minMatches: 3,
                },
            },
            {
                id: 'projectExamples',
                label: 'Describe 2‑3 significant full‑stack projects you have built',
                description: 'Include: project purpose, tech stack, architecture, challenges, and your role.',
                type: 'textarea',
                validation: { min: 500, max: 2500 },
                required: true,
                weight: {
                    kind: 'ai',
                    value: 30,
                    criteria: ['Technical Breadth', 'Project Complexity', 'Problem Solving'],
                },
            },
            {
                id: 'resume',
                label: 'Resume or CV',
                type: 'file',
                validation: { fileTypes: ['.pdf', '.doc', '.docx'], maxFileSize: 5 },
                required: true,
                weight: 15,
            },
        ],
    },

    {
        id: 'junior-frontend',
        meta: {
            title: 'Junior Frontend Developer',
            department: 'Engineering',
            type: 'Full-time',
            level: 'Junior',
            location: 'Remote (Global)',
            description: 'Build responsive, interactive user interfaces using modern frontend technologies. Perfect for career growth.',
            featured: false,
        },

        requirements: [
            '1+ years of frontend development experience',
            'Proficiency in HTML, CSS, and JavaScript',
            'Experience with React or Vue.js',
            'Understanding of responsive design principles',
            'Passion for learning and growth'
        ],

        benefits: [
            'Comprehensive mentorship program',
            'Fast‑track career growth opportunities',
            'Learning resources and training budget',
            'Flexible working hours',
        ],

        skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Git'],

        evaluationCriteria: {
            'Foundation Skills': 'HTML, CSS, JavaScript fundamentals and best practices',
            'Learning Attitude': 'Growth mindset, eagerness to learn, curiosity about new technologies',
            'Potential': 'Ability to grow into mid-level role with mentorship',
            'Communication': 'Clear expression, professional presentation',
            'Motivation': 'Genuine interest in frontend development and company alignment'
        },

        form: [
            {
                id: 'firstName',
                label: 'First Name',
                type: 'text',
                required: true,
                weight: 5,
            },
            {
                id: 'lastName',
                label: 'Last Name',
                type: 'text',
                required: true,
                weight: 5,
            },
            {
                id: 'email',
                label: 'Email Address',
                type: 'email',
                required: true,
                weight: 5,
            },
            {
                id: 'portfolio',
                label: 'Portfolio or GitHub',
                description: 'Show us your code projects, even personal or learning projects',
                type: 'url',
                required: false,
                weight: 10,
            },
            {
                id: 'yearsExperience',
                label: 'Years of Frontend Development',
                type: 'select',
                options: ['Less than 1 year', '1-2 years', '2-3 years'],
                required: true,
                weight: 15,
            },
            {
                id: 'techStack',
                label: 'Frontend Technologies you have used',
                type: 'multiselect',
                options: [
                    'HTML', 'CSS', 'JavaScript', 'React', 'Vue.js', 'Tailwind CSS',
                    'Bootstrap', 'TypeScript', 'Git', 'npm/yarn', 'Responsive Design'
                ],
                required: true,
                weight: 20,
            },
            {
                id: 'learningGoals',
                label: 'What are your learning goals and why do you want to grow with us?',
                description: 'Tell us about your passion for frontend development and career aspirations.',
                type: 'textarea',
                validation: { min: 200, max: 800 },
                required: true,
                weight: {
                    kind: 'ai',
                    value: 25,
                    criteria: ['Learning Attitude', 'Motivation', 'Communication'],
                },
            },
            {
                id: 'resume',
                label: 'Resume or CV',
                type: 'file',
                validation: { fileTypes: ['.pdf', '.doc', '.docx'], maxFileSize: 5 },
                required: true,
                weight: 15,
            },
        ],
    },
];

// Helper functions
export const getJobById = (id: string): JobDefinition | undefined => {
    return jobs.find(job => job.id === id);
};

export const getAllJobs = (): JobDefinition[] => {
    return jobs;
};

export const getFeaturedJobs = (): JobDefinition[] => {
    return jobs.filter(job => job.meta.featured);
};

export const getJobsByDepartment = (department: string): JobDefinition[] => {
    return jobs.filter(job => job.meta.department === department);
};