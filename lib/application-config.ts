// lib/application-config.ts
import { ApplicationConfig, ApplicationResponse, FormQuestion } from '../types/application';

export const applicationConfigs: Record<string, ApplicationConfig> = {
    "ai-data-engineer": {
        positionId: "ai-data-engineer",
        positionTitle: "AI/Data Engineer",
        scoringThreshold: 75,
        autoEmailThreshold: 85,
        requiredDocuments: ["resume", "portfolio"],
        sections: [
            {
                id: "personal",
                title: "Personal Information",
                description: "Tell us about yourself",
                questions: [
                    {
                        id: "firstName",
                        type: "text",
                        label: "First Name",
                        placeholder: "Enter your first name",
                        required: true,
                        weight: 5
                    },
                    {
                        id: "lastName",
                        type: "text",
                        label: "Last Name",
                        placeholder: "Enter your last name",
                        required: true,
                        weight: 5
                    },
                    {
                        id: "email",
                        type: "email",
                        label: "Email Address",
                        placeholder: "your.email@example.com",
                        required: true,
                        weight: 5
                    },
                    {
                        id: "phone",
                        type: "tel",
                        label: "Phone Number",
                        placeholder: "+1 (555) 123-4567",
                        required: true,
                        weight: 3
                    },
                    {
                        id: "location",
                        type: "text",
                        label: "Current Location",
                        placeholder: "City, Country",
                        required: true,
                        description: "We're remote-first, but we'd like to know your timezone",
                        weight: 3
                    },
                    {
                        id: "portfolio",
                        type: "url",
                        label: "Portfolio/GitHub",
                        placeholder: "https://github.com/yourusername",
                        required: true,
                        description: "Share your code repositories or data science projects",
                        weight: 15
                    }
                ]
            },
            {
                id: "experience",
                title: "AI/Data Experience",
                description: "Tell us about your AI and data engineering background",
                questions: [
                    {
                        id: "yearsExperience",
                        type: "select",
                        label: "Years of AI/Data Engineering Experience",
                        required: true,
                        options: [
                            "Less than 1 year",
                            "1-2 years",
                            "3-4 years",
                            "5-7 years",
                            "8+ years"
                        ],
                        weight: 15
                    },
                    {
                        id: "aiTechStack",
                        type: "multiselect",
                        label: "AI/ML Technologies (Select all that apply)",
                        required: true,
                        options: [
                            "Python",
                            "TensorFlow",
                            "PyTorch",
                            "Scikit-learn",
                            "Pandas",
                            "NumPy",
                            "SQL",
                            "Apache Spark",
                            "Airflow",
                            "Docker",
                            "Kubernetes",
                            "AWS",
                            "GCP",
                            "Azure"
                        ],
                        weight: 20
                    },
                    {
                        id: "mlProjects",
                        type: "textarea",
                        label: "Describe 2-3 AI/ML projects you've built",
                        placeholder: "For each project, describe: the problem, data sources, ML models used, deployment strategy, and business impact.",
                        required: true,
                        validation: {
                            min: 200,
                            max: 1000
                        },
                        weight: 25
                    }
                ]
            },
            {
                id: "culture",
                title: "Culture & Values",
                description: "Understanding your work style and values",
                questions: [
                    {
                        id: "remoteExperience",
                        type: "select",
                        label: "Remote Work Experience",
                        required: true,
                        options: [
                            "No remote work experience",
                            "Less than 1 year remote",
                            "1-2 years remote",
                            "3+ years remote",
                            "Fully remote for 5+ years"
                        ],
                        weight: 10
                    },
                    {
                        id: "workingStyle",
                        type: "textarea",
                        label: "How do you approach complex data problems?",
                        placeholder: "Describe your methodology for tackling ambiguous data challenges and how you ensure model reliability.",
                        required: true,
                        validation: {
                            min: 100,
                            max: 400
                        },
                        weight: 15
                    }
                ]
            },
            {
                id: "documents",
                title: "Documents & Final Steps",
                questions: [
                    {
                        id: "resume",
                        type: "file",
                        label: "Resume/CV",
                        required: true,
                        description: "PDF format preferred, max 5MB",
                        validation: {
                            fileTypes: [".pdf", ".doc", ".docx"],
                            maxFileSize: 5
                        },
                        weight: 15
                    },
                    {
                        id: "availability",
                        type: "select",
                        label: "When can you start?",
                        required: true,
                        options: [
                            "Immediately",
                            "Within 2 weeks",
                            "Within 1 month",
                            "2-3 months"
                        ],
                        weight: 5
                    }
                ]
            }
        ]
    },

    "full-stack-developer": {
        positionId: "full-stack-developer",
        positionTitle: "Full-Stack Developer",
        scoringThreshold: 70,
        autoEmailThreshold: 85,
        requiredDocuments: ["resume", "portfolio"],
        sections: [
            {
                id: "personal",
                title: "Personal Information",
                description: "Tell us about yourself",
                questions: [
                    {
                        id: "firstName",
                        type: "text",
                        label: "First Name",
                        placeholder: "Enter your first name",
                        required: true,
                        weight: 5
                    },
                    {
                        id: "lastName",
                        type: "text",
                        label: "Last Name",
                        placeholder: "Enter your last name",
                        required: true,
                        weight: 5
                    },
                    {
                        id: "email",
                        type: "email",
                        label: "Email Address",
                        placeholder: "your.email@example.com",
                        required: true,
                        weight: 5
                    },
                    {
                        id: "portfolio",
                        type: "url",
                        label: "Portfolio/Website",
                        placeholder: "https://yourportfolio.com",
                        required: true,
                        description: "Share your best development work",
                        weight: 15
                    }
                ]
            },
            {
                id: "experience",
                title: "Development Experience",
                questions: [
                    {
                        id: "yearsExperience",
                        type: "select",
                        label: "Years of Full-Stack Development Experience",
                        required: true,
                        options: [
                            "Less than 1 year",
                            "1-2 years",
                            "3-4 years",
                            "5+ years"
                        ],
                        weight: 15
                    },
                    {
                        id: "techStack",
                        type: "multiselect",
                        label: "Technologies (Select all that apply)",
                        required: true,
                        options: [
                            "React",
                            "Next.js",
                            "Node.js",
                            "TypeScript",
                            "JavaScript",
                            "PostgreSQL",
                            "MongoDB",
                            "REST APIs",
                            "GraphQL",
                            "AWS",
                            "Docker"
                        ],
                        weight: 20
                    },
                    {
                        id: "projectExamples",
                        type: "textarea",
                        label: "Describe 2-3 full-stack projects you've built",
                        required: true,
                        validation: {
                            min: 200,
                            max: 800
                        },
                        weight: 25
                    }
                ]
            },
            {
                id: "documents",
                title: "Documents",
                questions: [
                    {
                        id: "resume",
                        type: "file",
                        label: "Resume/CV",
                        required: true,
                        validation: {
                            fileTypes: [".pdf", ".doc", ".docx"],
                            maxFileSize: 5
                        },
                        weight: 15
                    }
                ]
            }
        ]
    },

    "growth-marketer": {
        positionId: "growth-marketer",
        positionTitle: "Growth Marketer",
        scoringThreshold: 65,
        autoEmailThreshold: 80,
        requiredDocuments: ["resume", "portfolio"],
        sections: [
            {
                id: "personal",
                title: "Personal Information",
                questions: [
                    {
                        id: "firstName",
                        type: "text",
                        label: "First Name",
                        required: true,
                        weight: 5
                    },
                    {
                        id: "lastName",
                        type: "text",
                        label: "Last Name",
                        required: true,
                        weight: 5
                    },
                    {
                        id: "email",
                        type: "email",
                        label: "Email Address",
                        required: true,
                        weight: 5
                    },
                    {
                        id: "portfolio",
                        type: "url",
                        label: "Portfolio/Case Studies",
                        required: true,
                        description: "Share your marketing campaigns and results",
                        weight: 20
                    }
                ]
            },
            {
                id: "experience",
                title: "Marketing Experience",
                questions: [
                    {
                        id: "yearsExperience",
                        type: "select",
                        label: "Years of Growth Marketing Experience",
                        required: true,
                        options: [
                            "Less than 1 year",
                            "1-2 years",
                            "3-4 years",
                            "5+ years"
                        ],
                        weight: 15
                    },
                    {
                        id: "marketingChannels",
                        type: "multiselect",
                        label: "Marketing Channels (Select all that apply)",
                        required: true,
                        options: [
                            "SEO",
                            "SEM/PPC",
                            "Social Media Marketing",
                            "Content Marketing",
                            "Email Marketing",
                            "A/B Testing",
                            "Analytics",
                            "Growth Hacking",
                            "Conversion Optimization"
                        ],
                        weight: 20
                    },
                    {
                        id: "campaignExamples",
                        type: "textarea",
                        label: "Describe 2-3 successful growth campaigns",
                        required: true,
                        validation: {
                            min: 200,
                            max: 800
                        },
                        weight: 25
                    }
                ]
            },
            {
                id: "documents",
                title: "Documents",
                questions: [
                    {
                        id: "resume",
                        type: "file",
                        label: "Resume/CV",
                        required: true,
                        validation: {
                            fileTypes: [".pdf", ".doc", ".docx"],
                            maxFileSize: 5
                        },
                        weight: 15
                    }
                ]
            }
        ]
    },

    "senior-full-stack": {
        positionId: "senior-full-stack",
        positionTitle: "Senior Full-Stack Developer",
        scoringThreshold: 75,
        autoEmailThreshold: 90,
        requiredDocuments: ["resume", "portfolio"],
        sections: [
            {
                id: "personal",
                title: "Personal Information",
                description: "Tell us about yourself",
                questions: [
                    {
                        id: "firstName",
                        type: "text",
                        label: "First Name",
                        placeholder: "Enter your first name",
                        required: true,
                        weight: 5
                    },
                    {
                        id: "lastName",
                        type: "text",
                        label: "Last Name",
                        placeholder: "Enter your last name",
                        required: true,
                        weight: 5
                    },
                    {
                        id: "email",
                        type: "email",
                        label: "Email Address",
                        placeholder: "your.email@example.com",
                        required: true,
                        weight: 5
                    },
                    {
                        id: "portfolio",
                        type: "url",
                        label: "Portfolio/Website",
                        placeholder: "https://yourportfolio.com",
                        required: true,
                        description: "Share your best work with us",
                        weight: 15
                    }
                ]
            },
            {
                id: "experience",
                title: "Senior Development Experience",
                description: "Tell us about your leadership and technical expertise",
                questions: [
                    {
                        id: "yearsExperience",
                        type: "select",
                        label: "Years of Professional Development Experience",
                        required: true,
                        options: [
                            "3-4 years",
                            "5-7 years",
                            "8-10 years",
                            "More than 10 years"
                        ],
                        weight: 15
                    },
                    {
                        id: "techStack",
                        type: "multiselect",
                        label: "Primary Technologies (Select all that apply)",
                        required: true,
                        options: [
                            "React",
                            "Next.js",
                            "Vue.js",
                            "Angular",
                            "Node.js",
                            "Express.js",
                            "TypeScript",
                            "JavaScript",
                            "Python",
                            "PostgreSQL",
                            "MongoDB",
                            "Redis",
                            "AWS",
                            "Docker",
                            "Kubernetes"
                        ],
                        weight: 20
                    },
                    {
                        id: "projectExamples",
                        type: "textarea",
                        label: "Describe 2-3 significant projects you've led",
                        placeholder: "Focus on technical leadership, architecture decisions, and mentoring aspects.",
                        required: true,
                        validation: {
                            min: 300,
                            max: 1000
                        },
                        weight: 25
                    }
                ]
            },
            {
                id: "documents",
                title: "Documents",
                questions: [
                    {
                        id: "resume",
                        type: "file",
                        label: "Resume/CV",
                        required: true,
                        validation: {
                            fileTypes: [".pdf", ".doc", ".docx"],
                            maxFileSize: 5
                        },
                        weight: 15
                    }
                ]
            }
        ]
    },

    "ui-ux-designer": {
        positionId: "ui-ux-designer",
        positionTitle: "UI/UX Designer",
        scoringThreshold: 65,
        autoEmailThreshold: 80,
        requiredDocuments: ["resume", "portfolio"],
        sections: [
            {
                id: "personal",
                title: "Personal Information",
                questions: [
                    {
                        id: "firstName",
                        type: "text",
                        label: "First Name",
                        required: true,
                        weight: 5
                    },
                    {
                        id: "lastName",
                        type: "text",
                        label: "Last Name",
                        required: true,
                        weight: 5
                    },
                    {
                        id: "email",
                        type: "email",
                        label: "Email Address",
                        required: true,
                        weight: 5
                    },
                    {
                        id: "portfolio",
                        type: "url",
                        label: "Design Portfolio",
                        required: true,
                        description: "Show us your best design work",
                        weight: 25
                    }
                ]
            },
            {
                id: "experience",
                title: "Design Experience",
                questions: [
                    {
                        id: "yearsExperience",
                        type: "select",
                        label: "Years of Design Experience",
                        required: true,
                        options: [
                            "Less than 1 year",
                            "1-2 years",
                            "3-4 years",
                            "5+ years"
                        ],
                        weight: 15
                    },
                    {
                        id: "designTools",
                        type: "multiselect",
                        label: "Design Tools (Select all that apply)",
                        required: true,
                        options: [
                            "Figma",
                            "Adobe Creative Suite",
                            "Sketch",
                            "Prototyping",
                            "User Research",
                            "Adobe XD",
                            "Principle"
                        ],
                        weight: 20
                    },
                    {
                        id: "designProcess",
                        type: "textarea",
                        label: "Describe your design process from concept to delivery",
                        required: true,
                        validation: {
                            min: 200,
                            max: 600
                        },
                        weight: 25
                    }
                ]
            },
            {
                id: "documents",
                title: "Portfolio & Documents",
                questions: [
                    {
                        id: "resume",
                        type: "file",
                        label: "Resume/CV",
                        required: true,
                        validation: {
                            fileTypes: [".pdf", ".doc", ".docx"],
                            maxFileSize: 5
                        },
                        weight: 10
                    }
                ]
            }
        ]
    },

    "devops-engineer": {
        positionId: "devops-engineer",
        positionTitle: "DevOps Engineer",
        scoringThreshold: 70,
        autoEmailThreshold: 85,
        requiredDocuments: ["resume"],
        sections: [
            {
                id: "personal",
                title: "Personal Information",
                questions: [
                    {
                        id: "firstName",
                        type: "text",
                        label: "First Name",
                        required: true,
                        weight: 5
                    },
                    {
                        id: "lastName",
                        type: "text",
                        label: "Last Name",
                        required: true,
                        weight: 5
                    },
                    {
                        id: "email",
                        type: "email",
                        label: "Email Address",
                        required: true,
                        weight: 5
                    }
                ]
            },
            {
                id: "experience",
                title: "DevOps Experience",
                questions: [
                    {
                        id: "yearsExperience",
                        type: "select",
                        label: "Years of DevOps Experience",
                        required: true,
                        options: [
                            "Less than 1 year",
                            "1-2 years",
                            "3-4 years",
                            "5+ years"
                        ],
                        weight: 15
                    },
                    {
                        id: "devopsTools",
                        type: "multiselect",
                        label: "DevOps Tools (Select all that apply)",
                        required: true,
                        options: [
                            "AWS",
                            "Docker",
                            "Kubernetes",
                            "Terraform",
                            "CI/CD",
                            "Azure",
                            "Jenkins",
                            "GitLab CI",
                            "Ansible",
                            "Prometheus"
                        ],
                        weight: 25
                    },
                    {
                        id: "infrastructureProjects",
                        type: "textarea",
                        label: "Describe your infrastructure automation experience",
                        required: true,
                        validation: {
                            min: 150,
                            max: 600
                        },
                        weight: 25
                    }
                ]
            },
            {
                id: "documents",
                title: "Documents",
                questions: [
                    {
                        id: "resume",
                        type: "file",
                        label: "Resume/CV",
                        required: true,
                        validation: {
                            fileTypes: [".pdf", ".doc", ".docx"],
                            maxFileSize: 5
                        },
                        weight: 15
                    }
                ]
            }
        ]
    },

    "mobile-developer": {
        positionId: "mobile-developer",
        positionTitle: "Mobile Developer",
        scoringThreshold: 60,
        autoEmailThreshold: 75,
        requiredDocuments: ["resume"],
        sections: [
            {
                id: "personal",
                title: "Personal Information",
                questions: [
                    {
                        id: "firstName",
                        type: "text",
                        label: "First Name",
                        required: true,
                        weight: 5
                    },
                    {
                        id: "lastName",
                        type: "text",
                        label: "Last Name",
                        required: true,
                        weight: 5
                    },
                    {
                        id: "email",
                        type: "email",
                        label: "Email Address",
                        required: true,
                        weight: 5
                    }
                ]
            },
            {
                id: "experience",
                title: "Mobile Development Experience",
                questions: [
                    {
                        id: "yearsExperience",
                        type: "select",
                        label: "Years of Mobile Development Experience",
                        required: true,
                        options: [
                            "Less than 1 year",
                            "1-2 years",
                            "3-4 years",
                            "5+ years"
                        ],
                        weight: 15
                    },
                    {
                        id: "mobileTools",
                        type: "multiselect",
                        label: "Mobile Technologies (Select all that apply)",
                        required: true,
                        options: [
                            "React Native",
                            "JavaScript",
                            "iOS",
                            "Android",
                            "Firebase",
                            "Flutter",
                            "Swift",
                            "Kotlin"
                        ],
                        weight: 25
                    },
                    {
                        id: "appExamples",
                        type: "textarea",
                        label: "Describe mobile apps you've built",
                        required: true,
                        validation: {
                            min: 100,
                            max: 500
                        },
                        weight: 25
                    }
                ]
            },
            {
                id: "documents",
                title: "Documents",
                questions: [
                    {
                        id: "resume",
                        type: "file",
                        label: "Resume/CV",
                        required: true,
                        validation: {
                            fileTypes: [".pdf", ".doc", ".docx"],
                            maxFileSize: 5
                        },
                        weight: 15
                    }
                ]
            }
        ]
    },

    "project-manager": {
        positionId: "project-manager",
        positionTitle: "Project Manager",
        scoringThreshold: 65,
        autoEmailThreshold: 80,
        requiredDocuments: ["resume"],
        sections: [
            {
                id: "personal",
                title: "Personal Information",
                questions: [
                    {
                        id: "firstName",
                        type: "text",
                        label: "First Name",
                        required: true,
                        weight: 5
                    },
                    {
                        id: "lastName",
                        type: "text",
                        label: "Last Name",
                        required: true,
                        weight: 5
                    },
                    {
                        id: "email",
                        type: "email",
                        label: "Email Address",
                        required: true,
                        weight: 5
                    }
                ]
            },
            {
                id: "experience",
                title: "Project Management Experience",
                questions: [
                    {
                        id: "yearsExperience",
                        type: "select",
                        label: "Years of Project Management Experience",
                        required: true,
                        options: [
                            "1-2 years",
                            "3-4 years",
                            "5-7 years",
                            "8+ years"
                        ],
                        weight: 15
                    },
                    {
                        id: "pmTools",
                        type: "multiselect",
                        label: "Project Management Skills (Select all that apply)",
                        required: true,
                        options: [
                            "Agile",
                            "Scrum",
                            "Jira",
                            "Client Management",
                            "Team Leadership",
                            "Kanban",
                            "Risk Management",
                            "Budget Management"
                        ],
                        weight: 25
                    },
                    {
                        id: "projectExamples",
                        type: "textarea",
                        label: "Describe complex projects you've managed",
                        required: true,
                        validation: {
                            min: 200,
                            max: 800
                        },
                        weight: 25
                    }
                ]
            },
            {
                id: "documents",
                title: "Documents",
                questions: [
                    {
                        id: "resume",
                        type: "file",
                        label: "Resume/CV",
                        required: true,
                        validation: {
                            fileTypes: [".pdf", ".doc", ".docx"],
                            maxFileSize: 5
                        },
                        weight: 15
                    }
                ]
            }
        ]
    },

    "junior-frontend": {
        positionId: "junior-frontend",
        positionTitle: "Junior Frontend Developer",
        scoringThreshold: 55,
        autoEmailThreshold: 70,
        requiredDocuments: ["resume"],
        sections: [
            {
                id: "personal",
                title: "Personal Information",
                questions: [
                    {
                        id: "firstName",
                        type: "text",
                        label: "First Name",
                        required: true,
                        weight: 5
                    },
                    {
                        id: "lastName",
                        type: "text",
                        label: "Last Name",
                        required: true,
                        weight: 5
                    },
                    {
                        id: "email",
                        type: "email",
                        label: "Email Address",
                        required: true,
                        weight: 5
                    },
                    {
                        id: "portfolio",
                        type: "url",
                        label: "Portfolio/GitHub",
                        required: false,
                        description: "Share your code projects (optional)",
                        weight: 10
                    }
                ]
            },
            {
                id: "experience",
                title: "Frontend Development Experience",
                questions: [
                    {
                        id: "yearsExperience",
                        type: "select",
                        label: "Years of Frontend Development Experience",
                        required: true,
                        options: [
                            "Less than 1 year",
                            "1-2 years",
                            "2-3 years"
                        ],
                        weight: 15
                    },
                    {
                        id: "frontendTools",
                        type: "multiselect",
                        label: "Frontend Technologies (Select all that apply)",
                        required: true,
                        options: [
                            "HTML",
                            "CSS",
                            "JavaScript",
                            "React",
                            "Tailwind CSS",
                            "Vue.js",
                            "TypeScript",
                            "Git"
                        ],
                        weight: 25
                    },
                    {
                        id: "learningGoals",
                        type: "textarea",
                        label: "What are your learning goals and why do you want to grow with us?",
                        required: true,
                        validation: {
                            min: 100,
                            max: 400
                        },
                        weight: 20
                    }
                ]
            },
            {
                id: "documents",
                title: "Documents",
                questions: [
                    {
                        id: "resume",
                        type: "file",
                        label: "Resume/CV",
                        required: true,
                        validation: {
                            fileTypes: [".pdf", ".doc", ".docx"],
                            maxFileSize: 5
                        },
                        weight: 15
                    }
                ]
            }
        ]
    }
};

// Keep the existing ApplicationScorer class as is...
export class ApplicationScorer {
    static calculateScore(responses: ApplicationResponse[], config: ApplicationConfig): number {
        let totalWeight = 0;
        let earnedPoints = 0;

        for (const section of config.sections) {
            for (const question of section.questions) {
                const response = responses.find(r => r.questionId === question.id);
                const weight = question.weight || 0;
                totalWeight += weight;

                if (response && response.value) {
                    const points = this.scoreQuestion(question, response);
                    earnedPoints += (points * weight) / 100;
                }
            }
        }

        return totalWeight > 0 ? Math.round((earnedPoints / totalWeight) * 100) : 0;
    }

    private static scoreQuestion(question: FormQuestion, response: ApplicationResponse): number {
        if (!response.value) return 0;

        switch (question.type) {
            case "text":
            case "email":
            case "tel":
            case "url":
                return this.scoreTextQuestion(question, response.value as string);

            case "select":
            case "radio":
                return this.scoreSelectQuestion(question, response.value as string);

            case "multiselect":
                return this.scoreMultiSelectQuestion(question, response.value as string[]);

            case "textarea":
                return this.scoreTextAreaQuestion(question, response.value as string);

            case "file":
                return response.value ? 100 : 0;

            case "number":
                return this.scoreNumberQuestion(question, Number(response.value));

            default:
                return response.value ? 100 : 0;
        }
    }

    private static scoreTextQuestion(question: FormQuestion, value: string): number {
        if (!value.trim()) return 0;

        if (question.validation?.min && value.length < question.validation.min) {
            return 50;
        }

        return 100;
    }

    private static scoreSelectQuestion(question: FormQuestion, value: string): number {
        if (!value) return 0;

        const index = question.options?.indexOf(value) || 0;
        const optionCount = question.options?.length || 1;

        if (question.id.includes('experience') || question.id.includes('years')) {
            return Math.max(20, (index / (optionCount - 1)) * 100);
        }

        return 100;
    }

    private static scoreMultiSelectQuestion(question: FormQuestion, values: string[]): number {
        if (!values || values.length === 0) return 0;

        const maxRelevant = Math.min(question.options?.length || 1, 8);
        const score = Math.min(100, (values.length / maxRelevant) * 100);

        return Math.max(20, score);
    }

    private static scoreTextAreaQuestion(question: FormQuestion, value: string): number {
        if (!value.trim()) return 0;

        const wordCount = value.trim().split(/\s+/).length;
        const minWords = question.validation?.min ? question.validation.min / 5 : 20;
        const maxWords = question.validation?.max ? question.validation.max / 5 : 200;

        if (wordCount < minWords) return 30;
        if (wordCount > maxWords) return 80;

        let score = 70;

        if (wordCount >= minWords && wordCount <= maxWords) {
            score += 20;
        }

        if (value.includes('\n') || value.includes('•') || /\d+\./.test(value)) {
            score += 10;
        }

        return Math.min(100, score);
    }

    private static scoreNumberQuestion(question: FormQuestion, value: number): number {
        if (isNaN(value)) return 0;

        if (question.validation?.min && value < question.validation.min) return 20;
        if (question.validation?.max && value > question.validation.max) return 20;

        return 100;
    }
}