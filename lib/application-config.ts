import { ApplicationConfig } from '../types/application';

/**
 * All positions share the new SmartWeight system:
 *  - a plain number keeps the legacy behaviour
 *  - `{ type:'char', value:n, min:x, max:y }` scores by character count
 *  - `{ type:'ai', value:n, prompt:'...', model?:'...', maxScore?:100 }` scores with OpenRouter
 */

export const applicationConfigs: Record<string, ApplicationConfig> = {
    /* ------------------------------------------------------------------ */
    /* AI / DATA ENGINEER                                                 */
    /* ------------------------------------------------------------------ */
    'ai-data-engineer': {
        positionId: 'ai-data-engineer',
        positionTitle: 'AI/Data Engineer',
        requiredDocuments: ['resume', 'portfolio'],
        sections: [
            {
                id: 'personal',
                title: 'Personal Information',
                description: 'Tell us about yourself',
                questions: [
                    { id: 'firstName', type: 'text', label: 'First Name', required: true, weight: 5 },
                    { id: 'lastName', type: 'text', label: 'Last Name', required: true, weight: 5 },
                    { id: 'email', type: 'email', label: 'Email Address', required: true, weight: 5 },
                    { id: 'phone', type: 'tel', label: 'Phone Number', required: true, weight: 3 },
                    {
                        id: 'location',
                        type: 'text',
                        label: 'Current Location',
                        description: 'We are remote first but need your timezone',
                        required: true,
                        weight: 3,
                    },
                    {
                        id: 'portfolio',
                        type: 'url',
                        label: 'Portfolio or GitHub',
                        required: true,
                        description: 'Share your code or data projects',
                        weight: 15,
                    },
                ],
            },
            {
                id: 'experience',
                title: 'AI/Data Experience',
                description: 'Your background in ML and data engineering',
                questions: [
                    {
                        id: 'yearsExperience',
                        type: 'select',
                        label: 'Years of AI/Data Engineering Experience',
                        required: true,
                        options: ['Less than 1 year', '1-2 years', '3-4 years', '5-7 years', '8+ years'],
                        weight: 15,
                    },
                    {
                        id: 'aiTechStack',
                        type: 'multiselect',
                        label: 'AI/ML Technologies you use',
                        required: true,
                        options: [
                            'Python',
                            'TensorFlow',
                            'PyTorch',
                            'Scikit-learn',
                            'Pandas',
                            'NumPy',
                            'SQL',
                            'Apache Spark',
                            'Airflow',
                            'Docker',
                            'Kubernetes',
                            'AWS',
                            'GCP',
                            'Azure',
                        ],
                        weight: 20,
                    },
                    {
                        id: 'mlProjects',
                        type: 'textarea',
                        label: 'Describe 2‑3 AI/ML projects you have built',
                        placeholder:
                            'Include problem, data, model choice, deployment and business impact.',
                        required: true,
                        validation: { min: 200, max: 1000 },
                        weight: { type: 'char', value: 25, min: 800, max: 4000 },
                    },
                ],
            },
            {
                id: 'culture',
                title: 'Culture and Values',
                description: 'Understanding your work style',
                questions: [
                    {
                        id: 'remoteExperience',
                        type: 'select',
                        label: 'Remote Work Experience',
                        required: true,
                        options: [
                            'No remote work experience',
                            'Less than 1 year remote',
                            '1-2 years remote',
                            '3+ years remote',
                            'Fully remote for 5+ years',
                        ],
                        weight: 10,
                    },
                    {
                        id: 'workingStyle',
                        type: 'textarea',
                        label: 'How do you approach complex data problems?',
                        placeholder:
                            'Describe methodology for tackling ambiguous data challenges and ensuring model reliability.',
                        required: true,
                        validation: { min: 100, max: 400 },
                        weight: {
                            type: 'ai',
                            value: 15,
                            prompt:
                                'Score 0‑100 for clarity, structured thinking and depth of this answer:\n\n{{answer}}',
                            maxScore: 100,
                        },
                    },
                ],
            },
            {
                id: 'documents',
                title: 'Documents and Final Steps',
                questions: [
                    {
                        id: 'resume',
                        type: 'file',
                        label: 'Resume or CV',
                        required: true,
                        description: 'PDF preferred, max 5 MB',
                        validation: { fileTypes: ['.pdf', '.doc', '.docx'], maxFileSize: 5 },
                        weight: 15,
                    },
                    {
                        id: 'availability',
                        type: 'select',
                        label: 'When could you start?',
                        required: true,
                        options: ['Immediately', 'Within 2 weeks', 'Within 1 month', '2-3 months'],
                        weight: 5,
                    },
                ],
            },
        ],
    },

    /* ------------------------------------------------------------------ */
    /* FULL STACK DEVELOPER                                               */
    /* ------------------------------------------------------------------ */
    'full-stack-developer': {
        positionId: 'full-stack-developer',
        positionTitle: 'Full-Stack Developer',
        requiredDocuments: ['resume', 'portfolio'],
        sections: [
            {
                id: 'personal',
                title: 'Personal Information',
                description: 'Tell us about yourself',
                questions: [
                    { id: 'firstName', type: 'text', label: 'First Name', required: true, weight: 5 },
                    { id: 'lastName', type: 'text', label: 'Last Name', required: true, weight: 5 },
                    { id: 'email', type: 'email', label: 'Email Address', required: true, weight: 5 },
                    {
                        id: 'portfolio',
                        type: 'url',
                        label: 'Portfolio or Website',
                        description: 'Your best development work',
                        required: true,
                        weight: 15,
                    },
                ],
            },
            {
                id: 'experience',
                title: 'Development Experience',
                questions: [
                    {
                        id: 'yearsExperience',
                        type: 'select',
                        label: 'Years of Full‑Stack Development',
                        required: true,
                        options: ['Less than 1 year', '1-2 years', '3-4 years', '5+ years'],
                        weight: 15,
                    },
                    {
                        id: 'techStack',
                        type: 'multiselect',
                        label: 'Technologies you use',
                        required: true,
                        options: [
                            'React',
                            'Next.js',
                            'Node.js',
                            'TypeScript',
                            'JavaScript',
                            'PostgreSQL',
                            'MongoDB',
                            'REST APIs',
                            'GraphQL',
                            'AWS',
                            'Docker',
                        ],
                        weight: 20,
                    },
                    {
                        id: 'projectExamples',
                        type: 'textarea',
                        label: 'Describe 2‑3 full‑stack projects you have built',
                        required: true,
                        validation: { min: 200, max: 800 },
                        weight: { type: 'char', value: 25, min: 600, max: 3000 },
                    },
                ],
            },
            {
                id: 'documents',
                title: 'Documents',
                questions: [
                    {
                        id: 'resume',
                        type: 'file',
                        label: 'Resume or CV',
                        required: true,
                        validation: { fileTypes: ['.pdf', '.doc', '.docx'], maxFileSize: 5 },
                        weight: 15,
                    },
                ],
            },
        ],
    },

    /* ------------------------------------------------------------------ */
    /* GROWTH MARKETER                                                    */
    /* ------------------------------------------------------------------ */
    'growth-marketer': {
        positionId: 'growth-marketer',
        positionTitle: 'Growth Marketer',
        requiredDocuments: ['resume', 'portfolio'],
        sections: [
            {
                id: 'personal',
                title: 'Personal Information',
                questions: [
                    { id: 'firstName', type: 'text', label: 'First Name', required: true, weight: 5 },
                    { id: 'lastName', type: 'text', label: 'Last Name', required: true, weight: 5 },
                    { id: 'email', type: 'email', label: 'Email Address', required: true, weight: 5 },
                    {
                        id: 'portfolio',
                        type: 'url',
                        label: 'Portfolio or Case Studies',
                        required: true,
                        description: 'Share campaigns and results',
                        weight: 20,
                    },
                ],
            },
            {
                id: 'experience',
                title: 'Marketing Experience',
                questions: [
                    {
                        id: 'yearsExperience',
                        type: 'select',
                        label: 'Years of Growth Marketing',
                        required: true,
                        options: ['Less than 1 year', '1-2 years', '3-4 years', '5+ years'],
                        weight: 15,
                    },
                    {
                        id: 'marketingChannels',
                        type: 'multiselect',
                        label: 'Marketing Channels you use',
                        required: true,
                        options: [
                            'SEO',
                            'SEM/PPC',
                            'Social Media Marketing',
                            'Content Marketing',
                            'Email Marketing',
                            'A/B Testing',
                            'Analytics',
                            'Growth Hacking',
                            'Conversion Optimization',
                        ],
                        weight: 20,
                    },
                    {
                        id: 'campaignExamples',
                        type: 'textarea',
                        label: 'Describe 2‑3 successful growth campaigns',
                        required: true,
                        validation: { min: 200, max: 800 },
                        weight: {
                            type: 'ai',
                            value: 25,
                            prompt:
                                'Evaluate the strategic depth and measurable results of this growth campaign description. Return a score from 0‑100:\n\n{{answer}}',
                        },
                    },
                ],
            },
            {
                id: 'documents',
                title: 'Documents',
                questions: [
                    {
                        id: 'resume',
                        type: 'file',
                        label: 'Resume or CV',
                        required: true,
                        validation: { fileTypes: ['.pdf', '.doc', '.docx'], maxFileSize: 5 },
                        weight: 15,
                    },
                ],
            },
        ],
    },

    /* ------------------------------------------------------------------ */
    /* SENIOR FULL STACK                                                  */
    /* ------------------------------------------------------------------ */
    'senior-full-stack': {
        positionId: 'senior-full-stack',
        positionTitle: 'Senior Full-Stack Developer',
        requiredDocuments: ['resume', 'portfolio'],
        sections: [
            {
                id: 'personal',
                title: 'Personal Information',
                description: 'Tell us about yourself',
                questions: [
                    { id: 'firstName', type: 'text', label: 'First Name', required: true, weight: 5 },
                    { id: 'lastName', type: 'text', label: 'Last Name', required: true, weight: 5 },
                    { id: 'email', type: 'email', label: 'Email Address', required: true, weight: 5 },
                    {
                        id: 'portfolio',
                        type: 'url',
                        label: 'Portfolio or Website',
                        description: 'Show your best work',
                        required: true,
                        weight: 15,
                    },
                ],
            },
            {
                id: 'experience',
                title: 'Senior Development Experience',
                description: 'Leadership and technical expertise',
                questions: [
                    {
                        id: 'yearsExperience',
                        type: 'select',
                        label: 'Years of Professional Development',
                        required: true,
                        options: ['3-4 years', '5-7 years', '8-10 years', 'More than 10 years'],
                        weight: 15,
                    },
                    {
                        id: 'techStack',
                        type: 'multiselect',
                        label: 'Primary Technologies',
                        required: true,
                        options: [
                            'React',
                            'Next.js',
                            'Vue.js',
                            'Angular',
                            'Node.js',
                            'Express.js',
                            'TypeScript',
                            'JavaScript',
                            'Python',
                            'PostgreSQL',
                            'MongoDB',
                            'Redis',
                            'AWS',
                            'Docker',
                            'Kubernetes',
                        ],
                        weight: 20,
                    },
                    {
                        id: 'projectExamples',
                        type: 'textarea',
                        label: 'Describe 2‑3 significant projects you led',
                        placeholder: 'Highlight leadership, architecture decisions and mentoring',
                        required: true,
                        validation: { min: 300, max: 1000 },
                        weight: { type: 'char', value: 25, min: 900, max: 4000 },
                    },
                ],
            },
            {
                id: 'documents',
                title: 'Documents',
                questions: [
                    {
                        id: 'resume',
                        type: 'file',
                        label: 'Resume or CV',
                        required: true,
                        validation: { fileTypes: ['.pdf', '.doc', '.docx'], maxFileSize: 5 },
                        weight: 15,
                    },
                ],
            },
        ],
    },

    /* ------------------------------------------------------------------ */
    /* UI-UX DESIGNER                                                     */
    /* ------------------------------------------------------------------ */
    'ui-ux-designer': {
        positionId: 'ui-ux-designer',
        positionTitle: 'UI/UX Designer',
        requiredDocuments: ['resume', 'portfolio'],
        sections: [
            {
                id: 'personal',
                title: 'Personal Information',
                questions: [
                    { id: 'firstName', type: 'text', label: 'First Name', required: true, weight: 5 },
                    { id: 'lastName', type: 'text', label: 'Last Name', required: true, weight: 5 },
                    { id: 'email', type: 'email', label: 'Email Address', required: true, weight: 5 },
                    {
                        id: 'portfolio',
                        type: 'url',
                        label: 'Design Portfolio',
                        required: true,
                        description: 'Show your best design work',
                        weight: 25,
                    },
                ],
            },
            {
                id: 'experience',
                title: 'Design Experience',
                questions: [
                    {
                        id: 'yearsExperience',
                        type: 'select',
                        label: 'Years of Design Experience',
                        required: true,
                        options: ['Less than 1 year', '1-2 years', '3-4 years', '5+ years'],
                        weight: 15,
                    },
                    {
                        id: 'designTools',
                        type: 'multiselect',
                        label: 'Design Tools you use',
                        required: true,
                        options: [
                            'Figma',
                            'Adobe Creative Suite',
                            'Sketch',
                            'Prototyping',
                            'User Research',
                            'Adobe XD',
                            'Principle',
                        ],
                        weight: 20,
                    },
                    {
                        id: 'designProcess',
                        type: 'textarea',
                        label: 'Describe your design process from concept to delivery',
                        required: true,
                        validation: { min: 200, max: 600 },
                        weight: { type: 'char', value: 25, min: 600, max: 2500 },
                    },
                ],
            },
            {
                id: 'documents',
                title: 'Portfolio and Documents',
                questions: [
                    {
                        id: 'resume',
                        type: 'file',
                        label: 'Resume or CV',
                        required: true,
                        validation: { fileTypes: ['.pdf', '.doc', '.docx'], maxFileSize: 5 },
                        weight: 10,
                    },
                ],
            },
        ],
    },

    /* ------------------------------------------------------------------ */
    /* DEVOPS ENGINEER                                                    */
    /* ------------------------------------------------------------------ */
    'devops-engineer': {
        positionId: 'devops-engineer',
        positionTitle: 'DevOps Engineer',
        requiredDocuments: ['resume'],
        sections: [
            {
                id: 'personal',
                title: 'Personal Information',
                questions: [
                    { id: 'firstName', type: 'text', label: 'First Name', required: true, weight: 5 },
                    { id: 'lastName', type: 'text', label: 'Last Name', required: true, weight: 5 },
                    { id: 'email', type: 'email', label: 'Email Address', required: true, weight: 5 },
                ],
            },
            {
                id: 'experience',
                title: 'DevOps Experience',
                questions: [
                    {
                        id: 'yearsExperience',
                        type: 'select',
                        label: 'Years of DevOps Experience',
                        required: true,
                        options: ['Less than 1 year', '1-2 years', '3-4 years', '5+ years'],
                        weight: 15,
                    },
                    {
                        id: 'devopsTools',
                        type: 'multiselect',
                        label: 'DevOps Tools you use',
                        required: true,
                        options: [
                            'AWS',
                            'Docker',
                            'Kubernetes',
                            'Terraform',
                            'CI/CD',
                            'Azure',
                            'Jenkins',
                            'GitLab CI',
                            'Ansible',
                            'Prometheus',
                        ],
                        weight: 25,
                    },
                    {
                        id: 'infrastructureProjects',
                        type: 'textarea',
                        label: 'Describe your infrastructure automation experience',
                        required: true,
                        validation: { min: 150, max: 600 },
                        weight: { type: 'char', value: 25, min: 500, max: 2500 },
                    },
                ],
            },
            {
                id: 'documents',
                title: 'Documents',
                questions: [
                    {
                        id: 'resume',
                        type: 'file',
                        label: 'Resume or CV',
                        required: true,
                        validation: { fileTypes: ['.pdf', '.doc', '.docx'], maxFileSize: 5 },
                        weight: 15,
                    },
                ],
            },
        ],
    },

    /* ------------------------------------------------------------------ */
    /* MOBILE DEVELOPER                                                   */
    /* ------------------------------------------------------------------ */
    'mobile-developer': {
        positionId: 'mobile-developer',
        positionTitle: 'Mobile Developer',
        requiredDocuments: ['resume'],
        sections: [
            {
                id: 'personal',
                title: 'Personal Information',
                questions: [
                    { id: 'firstName', type: 'text', label: 'First Name', required: true, weight: 5 },
                    { id: 'lastName', type: 'text', label: 'Last Name', required: true, weight: 5 },
                    { id: 'email', type: 'email', label: 'Email Address', required: true, weight: 5 },
                ],
            },
            {
                id: 'experience',
                title: 'Mobile Development Experience',
                questions: [
                    {
                        id: 'yearsExperience',
                        type: 'select',
                        label: 'Years of Mobile Development',
                        required: true,
                        options: ['Less than 1 year', '1-2 years', '3-4 years', '5+ years'],
                        weight: 15,
                    },
                    {
                        id: 'mobileTools',
                        type: 'multiselect',
                        label: 'Mobile Technologies you use',
                        required: true,
                        options: [
                            'React Native',
                            'JavaScript',
                            'iOS',
                            'Android',
                            'Firebase',
                            'Flutter',
                            'Swift',
                            'Kotlin',
                        ],
                        weight: 25,
                    },
                    {
                        id: 'appExamples',
                        type: 'textarea',
                        label: 'Describe mobile apps you have built',
                        required: true,
                        validation: { min: 100, max: 500 },
                        weight: { type: 'char', value: 25, min: 400, max: 2000 },
                    },
                ],
            },
            {
                id: 'documents',
                title: 'Documents',
                questions: [
                    {
                        id: 'resume',
                        type: 'file',
                        label: 'Resume or CV',
                        required: true,
                        validation: { fileTypes: ['.pdf', '.doc', '.docx'], maxFileSize: 5 },
                        weight: 15,
                    },
                ],
            },
        ],
    },

    /* ------------------------------------------------------------------ */
    /* PROJECT MANAGER                                                    */
    /* ------------------------------------------------------------------ */
    'project-manager': {
        positionId: 'project-manager',
        positionTitle: 'Project Manager',
        requiredDocuments: ['resume'],
        sections: [
            {
                id: 'personal',
                title: 'Personal Information',
                questions: [
                    { id: 'firstName', type: 'text', label: 'First Name', required: true, weight: 5 },
                    { id: 'lastName', type: 'text', label: 'Last Name', required: true, weight: 5 },
                    { id: 'email', type: 'email', label: 'Email Address', required: true, weight: 5 },
                ],
            },
            {
                id: 'experience',
                title: 'Project Management Experience',
                questions: [
                    {
                        id: 'yearsExperience',
                        type: 'select',
                        label: 'Years of Project Management',
                        required: true,
                        options: ['1-2 years', '3-4 years', '5-7 years', '8+ years'],
                        weight: 15,
                    },
                    {
                        id: 'pmTools',
                        type: 'multiselect',
                        label: 'Project Management Skills',
                        required: true,
                        options: [
                            'Agile',
                            'Scrum',
                            'Jira',
                            'Client Management',
                            'Team Leadership',
                            'Kanban',
                            'Risk Management',
                            'Budget Management',
                        ],
                        weight: 25,
                    },
                    {
                        id: 'projectExamples',
                        type: 'textarea',
                        label: 'Describe complex projects you have managed',
                        required: true,
                        validation: { min: 200, max: 800 },
                        weight: { type: 'char', value: 25, min: 700, max: 3000 },
                    },
                ],
            },
            {
                id: 'documents',
                title: 'Documents',
                questions: [
                    {
                        id: 'resume',
                        type: 'file',
                        label: 'Resume or CV',
                        required: true,
                        validation: { fileTypes: ['.pdf', '.doc', '.docx'], maxFileSize: 5 },
                        weight: 15,
                    },
                ],
            },
        ],
    },

    /* ------------------------------------------------------------------ */
    /* JUNIOR FRONTEND                                                    */
    /* ------------------------------------------------------------------ */
    'junior-frontend': {
        positionId: 'junior-frontend',
        positionTitle: 'Junior Frontend Developer',
        requiredDocuments: ['resume'],
        sections: [
            {
                id: 'personal',
                title: 'Personal Information',
                questions: [
                    { id: 'firstName', type: 'text', label: 'First Name', required: true, weight: 5 },
                    { id: 'lastName', type: 'text', label: 'Last Name', required: true, weight: 5 },
                    { id: 'email', type: 'email', label: 'Email Address', required: true, weight: 5 },
                    {
                        id: 'portfolio',
                        type: 'url',
                        label: 'Portfolio or GitHub',
                        description: 'Optional code projects',
                        required: false,
                        weight: 10,
                    },
                ],
            },
            {
                id: 'experience',
                title: 'Frontend Development Experience',
                questions: [
                    {
                        id: 'yearsExperience',
                        type: 'select',
                        label: 'Years of Frontend Development',
                        required: true,
                        options: ['Less than 1 year', '1-2 years', '2-3 years'],
                        weight: 15,
                    },
                    {
                        id: 'frontendTools',
                        type: 'multiselect',
                        label: 'Frontend Technologies you use',
                        required: true,
                        options: [
                            'HTML',
                            'CSS',
                            'JavaScript',
                            'React',
                            'Tailwind CSS',
                            'Vue.js',
                            'TypeScript',
                            'Git',
                        ],
                        weight: 25,
                    },
                    {
                        id: 'learningGoals',
                        type: 'textarea',
                        label: 'What are your learning goals and why do you want to grow with us?',
                        required: true,
                        validation: { min: 100, max: 400 },
                        weight: {
                            type: 'ai',
                            value: 20,
                            prompt:
                                'Grade the motivation and alignment of the following learning goals with a fast paced startup. Return a score 0‑100:\n\n{{answer}}',
                        },
                    },
                ],
            },
            {
                id: 'documents',
                title: 'Documents',
                questions: [
                    {
                        id: 'resume',
                        type: 'file',
                        label: 'Resume or CV',
                        required: true,
                        validation: { fileTypes: ['.pdf', '.doc', '.docx'], maxFileSize: 5 },
                        weight: 15,
                    },
                ],
            },
        ],
    },
};
