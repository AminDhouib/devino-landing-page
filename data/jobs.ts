// data/jobs.ts
import { JobDefinition } from '~/lib/scoring/types';
import { FormConfig, FormQuestionConfig, QuestionType } from '~/lib/forms/form-types';

// Job definition that includes both old scoring system and new form system
export interface JobWithForm extends JobDefinition {
    formConfig: FormConfig;
}

export const jobs: JobWithForm[] = [
    {
        id: 'full-stack-engineer',
        meta: {
            title: 'Full-Stack Engineers w/ UI/UX Design Skills',
            department: 'Engineering',
            type: 'Full-time',
            level: 'Mid',
            location: 'Remote (Global)',
            description: 'Full-Stack Engineers w/ UI/UX Design Skills Looking For Fully Flexible Work: Join Us and Apply Here! Devino Solutions, a remote-first software consultancy that also ships its own apps.',
            featured: true,
        },

        requirements: [
            'Solid React / Next.js, modern CSS (Tailwind) skills',
            'Hands-on with Figma and great UI/UX product design skills, creating wireframes and high-fidelity mocks',
            'Exceptional Node.js (TypeScript) REST / API design skills',
            'Managing databases & performing SQL migrations',
            'Comfort building and documenting REST APIs',
        ],

        benefits: [
            'Work from anywhere, anytime 🏖️',
            'Rotate across projects — never get stuck working on only 1 project 🧩',
            'Rapid career growth in a lean team 🚀',
            'Flexible schedule with near-zero meetings 📅',
            'No micromanagement 🤝',
            'Organized sprints: every Monday you see all your tasks 🗂️',
            'Feedback is welcomed; you can shape the roadmap 💬',
            'Unlimited paid time off 🏝️',
            'Respect for faith and culture 🕌',
        ],

        skills: [
            'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Figma', 'UI/UX Design', 'Node.js',
            'REST APIs', 'SQL', 'Database Management', 'Framer Motion', 'Testing', 'DevOps'
        ],
        form: [],
        evaluationCriteria: {
            'Technical Skills': 'Proficiency in React/Next.js, TypeScript, API design, database management',
            'Design Skills': 'UI/UX design capabilities, Figma proficiency, design system understanding',
            'Full-Stack Experience': 'End-to-end project delivery, frontend and backend integration',
            'Problem Solving': 'Ability to architect solutions, optimize performance, debug complex issues',
            'Communication': 'Clear technical communication, collaborative mindset, documentation skills'
        },
        formConfig: {
            id: 'full-stack-engineer-form',
            positionId: 'full-stack-engineer',
            title: 'Full-Stack Engineers w/ UI/UX Design Skills Looking For Fully Flexible Work: Join Us and Apply Here!',
            description: 'Devino Solutions, a remote-first software consultancy that also ships its own apps: • 📚 uNotes — student community document hub → https://unotes.net • 🎬 Shorty — AI video & podcast summarizer → https://aishorty.com • 📦 UpUp — open-source file-upload NPM package → https://useupup.com • 🤤 Caramel — open-source alternative to Honey (for finding best coupons) → https://grabcaramel.com. If you crave variety, learning, and real ownership, you\'re in the right place — check us out at https://devino.ca.',
            sections: [
                {
                    id: 'referral',
                    title: 'Meet The Founder! 💸 WIN A 1000 TND BONUS FOR A SUCCESSFUL REFERRAL!!',
                    description: 'We are also looking for: An AI Data Engineers With DevOps Capabilities, Full-Stack Engineers w/ UI/UX Design Skills, A Growth Marketer With SAAS Experience. If you know anybody who fits these roles forward them the form and write the referral below. If we hire him and he is great fit to our team, you win 1000 TND.',
                    order: 1,
                    richContent: {
                        type: 'html',
                        content: `
                            <div class="mb-6">
                                <div class="relative w-full" style="padding-bottom: 56.25%; height: 0;">
                                    <iframe 
                                        src="https://www.youtube.com/embed/2CvyafUM6CM" 
                                        title="Meet The Founder - Devino Solutions"
                                        frameborder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowfullscreen
                                        class="absolute top-0 left-0 w-full h-full rounded-lg"
                                    ></iframe>
                                </div>
                            </div>
                            <p class="text-gray-600 dark:text-gray-300 mb-4">
                                Another way to submit a referral is by sending me a message through LinkedIn. Make sure that the referred candidate has submitted his/her application before messaging me. Make sure to tell me which job he/she applied for.
                            </p>
                            <div class="flex flex-col sm:flex-row gap-3">
                                <a href="https://www.linkedin.com/in/amin-dhouib/" target="_blank" rel="noopener noreferrer" 
                                   class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    My LinkedIn
                                </a>
                                <a href="https://www.instagram.com/amin.dhou/" target="_blank" rel="noopener noreferrer"
                                   class="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                                    My Instagram
                                </a>
                            </div>
                        `
                    },
                    questions: [
                        {
                            fieldKey: 'referral_names',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'Enter the full name of the people you referred including their contact information. (Optional)',
                            description: 'Another way to submit a referral is by sending me a message through LinkedIn. Make sure that the referred candidate has submitted his/her application before messaging me. Make sure to tell me which job he/she applied for. My Linkedin: https://www.linkedin.com/in/amin-dhouib/ My Instagram: https://www.instagram.com/amin.dhou/',
                            required: false,
                            order: 1,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        }
                    ]
                },
                {
                    id: 'contact',
                    title: 'Contact and Basic Info (Section 1 of 3)',
                    description: 'Let\'s start with the basics so we can get in touch with you.',
                    order: 2,
                    questions: [
                        {
                            fieldKey: 'full_name',
                            fieldType: QuestionType.TEXT,
                            label: 'Full Name 📝',
                            description: '',
                            required: true,
                            order: 1,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'country',
                            fieldType: QuestionType.TEXT,
                            label: 'Country of Residence 🌍',
                            description: '',
                            required: true,
                            order: 2,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'resume',
                            fieldType: QuestionType.FILE,
                            label: 'Upload Resume / CV 📄',
                            description: '',
                            required: true,
                            order: 3,
                            weight: 2,
                            scoreType: 'COMPLETION',
                            validation: {
                                fileTypes: ['.pdf', '.doc', '.docx'],
                                maxFileSize: 10
                            }
                        },
                        {
                            fieldKey: 'contact_linkedin',
                            fieldType: QuestionType.TEXT,
                            label: 'Contact Info (Linkedin) 💼 [Preferred]',
                            description: 'The more options, the better, as it will make it easier for me to reach back to you for the next steps.',
                            required: false,
                            order: 4,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'portfolio',
                            fieldType: QuestionType.URL,
                            label: 'Portfolio/GitHub Page 🌐',
                            description: 'Show us your best work! GitHub repos, live projects, or design portfolio.',
                            required: true,
                            order: 5,
                            weight: 2,
                            scoreType: 'COMPLETION',
                        }
                    ]
                },
                {
                    id: 'skillset',
                    title: 'Skillset (Section 2 of 3)',
                    description: 'IMPORTANT INFO ⚠️ Rate your skillset: 1 = no knowledge, 2-3 = heard about it, 4-5 = minimal application, 6-7 = 3-6 months experience, 8 = 1+ year, 9 = 18+ months, 10 = 2+ years recent experience',
                    order: 3,
                    questions: [
                        {
                            fieldKey: 'react_nextjs_skill',
                            fieldType: QuestionType.SCALE,
                            label: 'React / Next.js ⚛️',
                            description: '',
                            required: true,
                            order: 1,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                            validation: {
                                min: 1,
                                max: 10
                            }
                        },
                        {
                            fieldKey: 'typescript_skill',
                            fieldType: QuestionType.SCALE,
                            label: 'TypeScript 🟦',
                            description: '',
                            required: true,
                            order: 2,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                            validation: {
                                min: 1,
                                max: 10
                            }
                        },
                        {
                            fieldKey: 'css_tailwind_skill',
                            fieldType: QuestionType.SCALE,
                            label: 'Modern CSS / Tailwind CSS 🎨',
                            description: '',
                            required: true,
                            order: 3,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                            validation: {
                                min: 1,
                                max: 10
                            }
                        },
                        {
                            fieldKey: 'figma_design_skill',
                            fieldType: QuestionType.SCALE,
                            label: 'Figma & UI/UX Design Skills 🎨',
                            description: '',
                            required: true,
                            order: 4,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                            validation: {
                                min: 1,
                                max: 10
                            }
                        },
                        {
                            fieldKey: 'nodejs_api_skill',
                            fieldType: QuestionType.SCALE,
                            label: 'Node.js / API Development 🔌',
                            description: '',
                            required: true,
                            order: 5,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                            validation: {
                                min: 1,
                                max: 10
                            }
                        },
                        {
                            fieldKey: 'database_sql_skill',
                            fieldType: QuestionType.SCALE,
                            label: 'Database Management / SQL 🗄️',
                            description: '',
                            required: true,
                            order: 6,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                            validation: {
                                min: 1,
                                max: 10
                            }
                        }
                    ]
                },
                {
                    id: 'final_questions',
                    title: 'Final Questions (Section 3 of 3)',
                    description: 'Let me get to know you well!',
                    order: 4,
                    questions: [
                        {
                            fieldKey: 'best_work',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'Show me your best work! Share links to your most impressive project - what did you build and what technologies did you use? 🏅',
                            description: '',
                            required: true,
                            order: 1,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                        },
                        {
                            fieldKey: 'product_interest',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'Which of our products excites you most (uNotes, Shorty, UpUp, or Caramel) — and one UI/UX improvement you\'d make first? How would your full-stack skills bring this to life?',
                            description: '',
                            required: true,
                            order: 2,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                        },
                        {
                            fieldKey: 'design_process',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'Walk me through your design-to-code process. How do you go from a user problem to a shipped feature? 🎨➡️💻',
                            description: '',
                            required: true,
                            order: 3,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                        },
                        {
                            fieldKey: 'expected_salary',
                            fieldType: QuestionType.RADIO,
                            label: 'Expected Monthly Base Salary (Consider our perks!) 💰',
                            description: '',
                            required: true,
                            order: 4,
                            weight: 2,
                            scoreType: 'COMPLETION',
                            options: [
                                '2000-2500 TND',
                                '2500-3000 TND',
                                '3000-3500 TND',
                                '3500-4000 TND',
                                '4000-4500 TND',
                                'Other'
                            ]
                        },
                        {
                            fieldKey: 'start_date',
                            fieldType: QuestionType.RADIO,
                            label: 'When can you start if chosen? 🕒',
                            description: '',
                            required: true,
                            order: 5,
                            weight: 2,
                            scoreType: 'COMPLETION',
                            options: [
                                'Immediately⚡',
                                '1-2 Weeks From Now 📆',
                                '1 Month From Now 📆',
                                'Other'
                            ]
                        },
                        {
                            fieldKey: 'frog_emoji_test',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'BEFORE YOU SUBMIT - Connect with me on Linkedin: https://www.linkedin.com/in/amin-dhouib/ Follow my Instagram: https://www.instagram.com/amin.dhou/ This makes it easier for me to reach you! Send a frog emoji 🐸 in this field if you read the entire description.',
                            description: '',
                            required: false,
                            order: 6,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        }
                    ]
                }
            ]
        }
    },
    {
        id: 'ai-data-engineer',
        meta: {
            title: 'AI Data Engineers With DevOps Capabilities',
            department: 'Engineering',
            type: 'Full-time',
            level: 'Mid',
            location: 'Remote (Global)',
            description: 'AI Data Engineers With DevOps Capabilities Looking For Fully Flexible Work: Join Us and Apply Here! Devino Solutions, a remote-first software consultancy that also ships its own apps.',
            featured: true,
        },

        requirements: [
            'Solid JavaScript and Python skills',
            'Hands-on with GitHub Actions, Docker, Ansible, NGINX, Cloudflare (and similar tooling)',
            'Web-scraping, reverse engineering or general cybersecurity knowledge',
            'Machine-learning abilities: spaCy, PyTorch, BERT, OpenCV or fine-tuning LLMs',
            'Managing databases & performing SQL migrations',
            'Comfort building and documenting REST APIs',
        ],

        benefits: [
            'Work from anywhere, anytime 🏖️',
            'Rotate across projects — never get stuck working on only 1 project 🧩',
            'Rapid career growth in a lean team 🚀',
            'Flexible schedule with near-zero meetings 📅',
            'No micromanagement 🤝',
            'Organized sprints: every Monday you see all your tasks 🗂️',
            'Feedback is welcomed; you can shape the roadmap 💬',
            'Unlimited paid time off 🏝️',
            'Respect for faith and culture 🕌',
        ],

        skills: [
            'Python', 'JavaScript', 'TypeScript', 'Docker', 'GitHub Actions', 'Ansible', 'NGINX', 'Cloudflare',
            'Web Scraping', 'Cybersecurity', 'Machine Learning', 'PyTorch', 'BERT', 'OpenCV', 'SQL', 'REST APIs'
        ],

        // Legacy form configuration for backward compatibility
        form: [],

        // Generic evaluation criteria used by AI
        evaluationCriteria: {
            'Technical Depth': 'Real hands-on experience with ML frameworks, data engineering tools, proper technical terminology',
            'Project Complexity': 'End-to-end projects, scalability challenges, production deployment experience',
            'Business Impact': 'Quantifiable results, understanding of business context, problem-solving approach',
            'Communication': 'Clear explanations, structured thinking, professional presentation',
            'Authenticity': 'Realistic challenges, specific details that indicate genuine experience'
        },

        // New Prisma-compatible form configuration
        formConfig: {
            id: 'ai-data-engineer-form',
            positionId: 'ai-data-engineer',
            title: 'AI Data Engineers With DevOps Capabilities Looking For Fully Flexible Work: Join Us and Apply Here!',
            description: 'Devino Solutions, a remote-first software consultancy that also ships its own apps: • 📚 uNotes — student community document hub → https://unotes.net • 🎬 Shorty — AI video & podcast summarizer → https://aishorty.com • 📦 UpUp — open-source file-upload NPM package → https://useupup.com • 🤤 Caramel — open-source alternative to Honey (for finding best coupons) → https://grabcaramel.com. If you crave variety, learning, and real ownership, you\'re in the right place — check us out at https://devino.ca.',
            sections: [
                {
                    id: 'referral',
                    title: 'Meet The Founder! 💸 WIN A 1000 TND BONUS FOR A SUCCESSFUL REFERRAL!!',
                    description: 'We are also looking for: An AI Data Engineers With DevOps Capabilities, Full-Stack Engineers w/ UI/UX Design Skills, A Growth Marketer With SAAS Experience. If you know anybody who fits these roles forward them the form and write the referral below. If we hire him and he is great fit to our team, you win 1000 TND.',
                    order: 1,
                    richContent: {
                        type: 'html',
                        content: `
                            <div class="mb-6">
                                <div class="relative w-full" style="padding-bottom: 56.25%; height: 0;">
                                    <iframe 
                                        src="https://www.youtube.com/embed/2CvyafUM6CM" 
                                        title="Meet The Founder - Devino Solutions"
                                        frameborder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowfullscreen
                                        class="absolute top-0 left-0 w-full h-full rounded-lg"
                                    ></iframe>
                                </div>
                            </div>
                            <p class="text-gray-600 dark:text-gray-300 mb-4">
                                Another way to submit a referral is by sending me a message through LinkedIn. Make sure that the referred candidate has submitted his/her application before messaging me. Make sure to tell me which job he/she applied for.
                            </p>
                            <div class="flex flex-col sm:flex-row gap-3">
                                <a href="https://www.linkedin.com/in/amin-dhouib/" target="_blank" rel="noopener noreferrer" 
                                   class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    My LinkedIn
                                </a>
                                <a href="https://www.instagram.com/amin.dhou/" target="_blank" rel="noopener noreferrer"
                                   class="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                                    My Instagram
                                </a>
                            </div>
                        `
                    },
                    questions: [
                        {
                            fieldKey: 'referral_names',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'Enter the full name of the people you referred including their contact information. (Optional)',
                            description: 'Another way to submit a referral is by sending me a message through LinkedIn. Make sure that the referred candidate has submitted his/her application before messaging me. Make sure to tell me which job he/she applied for. My Linkedin: https://www.linkedin.com/in/amin-dhouib/ My Instagram: https://www.instagram.com/amin.dhou/',
                            required: false,
                            order: 1,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        }
                    ]
                },
                {
                    id: 'contact',
                    title: 'Contact and Basic Info (Section 1 of 3)',
                    description: 'Let\'s start with the basics so we can get in touch with you.',
                    order: 2,
                    questions: [
                        {
                            fieldKey: 'full_name',
                            fieldType: QuestionType.TEXT,
                            label: 'Full Name 📝',
                            description: '',
                            required: true,
                            order: 1,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'country',
                            fieldType: QuestionType.TEXT,
                            label: 'Country of Residence 🌍',
                            description: '',
                            required: true,
                            order: 2,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'resume',
                            fieldType: QuestionType.FILE,
                            label: 'Upload Resume / CV 📄',
                            description: '',
                            required: true,
                            order: 3,
                            weight: 2,
                            scoreType: 'COMPLETION',
                            validation: {
                                fileTypes: ['.pdf', '.doc', '.docx'],
                                maxFileSize: 10
                            }
                        },
                        {
                            fieldKey: 'contact_linkedin',
                            fieldType: QuestionType.TEXT,
                            label: 'Contact Info (Linkedin) 💼 [Preferred]',
                            description: 'The more options, the better, as it will make it easier for me to reach back to you for the next steps.',
                            required: false,
                            order: 4,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'contact_whatsapp',
                            fieldType: QuestionType.TEXT,
                            label: 'Contact Info (WhatsApp) 📱',
                            description: '',
                            required: false,
                            order: 5,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'contact_email',
                            fieldType: QuestionType.EMAIL,
                            label: 'Contact Info (Email Address) 📧',
                            description: '',
                            required: false,
                            order: 6,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'contact_facebook',
                            fieldType: QuestionType.TEXT,
                            label: 'Contact Info (Facebook) 📘',
                            description: '',
                            required: false,
                            order: 7,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'contact_instagram',
                            fieldType: QuestionType.TEXT,
                            label: 'Contact Info (Instagram) 📸',
                            description: '',
                            required: false,
                            order: 8,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'portfolio',
                            fieldType: QuestionType.URL,
                            label: 'Portfolio Page (Optional) 🌐',
                            description: '',
                            required: false,
                            order: 9,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'employment_status',
                            fieldType: QuestionType.RADIO,
                            label: 'Employment Status 💼',
                            description: '',
                            required: true,
                            order: 10,
                            weight: 1,
                            scoreType: 'COMPLETION',
                            options: [
                                'No current job, seeking full-time 🚀',
                                'Have a job, open to new roles 🔄'
                            ]
                        },
                        {
                            fieldKey: 'job_search_reason',
                            fieldType: QuestionType.CHECKBOX,
                            label: 'If you do have a job, why are you looking for new opportunities?',
                            description: '',
                            required: true,
                            order: 11,
                            weight: 2,
                            scoreType: 'COMPLETION',
                            options: [
                                'N/A (I don\'t have a job at the moment) 🚫',
                                'Unfair compensation package 💸',
                                'Poor work–life balance / excessive overtime 🕰️',
                                'Limited growth / promotion path🔒',
                                'Need fresh challenges or new tech to learn 🧠',
                                'Contract / project ending soon 🛑',
                                'Want remote or more flexible schedule 🕒',
                                'Company instability (layoffs, budget cuts, unclear future) 📉',
                                'Misalignment with personal values or ethics ❌',
                                'Other'
                            ]
                        },
                        {
                            fieldKey: 'current_job_details',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'Elaborate on what you like and dislike about your current job. Write "N/A" if you are not employed.',
                            description: '',
                            required: true,
                            order: 12,
                            weight: 2,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'work_motivation',
                            fieldType: QuestionType.CHECKBOX,
                            label: 'What motivates you to perform at your work?',
                            description: '',
                            required: true,
                            order: 13,
                            weight: 2,
                            scoreType: 'COMPLETION',
                            options: [
                                'Money 💰',
                                'Building things that help users 🛠️',
                                'Pushing myself to improve 🏋️',
                                'Supporting my family and loved ones 👪',
                                'Learning new technologies 📚',
                                'Recognition for good work 🏆',
                                'Career growth and responsibility 🚀',
                                'Mission-driven impact 🌍',
                                'Job security and stability 🛡️',
                                'Autonomy and ownership 🗝️'
                            ]
                        },
                        {
                            fieldKey: 'startup_experience',
                            fieldType: QuestionType.RADIO,
                            label: 'Previously Worked At A Startup? 🚀',
                            description: '',
                            required: true,
                            order: 14,
                            weight: 2,
                            scoreType: 'COMPLETION',
                            options: [
                                '2+ years ⏳',
                                '~1 year ⏳',
                                '<1 year ⏳',
                                'Never ❌'
                            ]
                        },
                        {
                            fieldKey: 'freelancer_experience',
                            fieldType: QuestionType.RADIO,
                            label: 'Previously Worked As A Full-Time Freelancer? 🛠️',
                            description: '',
                            required: true,
                            order: 15,
                            weight: 2,
                            scoreType: 'COMPLETION',
                            options: [
                                'Yes, I have worked on platforms like Upwork and Fiverr 🌐',
                                'Yes but I only did freelancing locally 🏠',
                                'No ❌'
                            ]
                        },
                        {
                            fieldKey: 'agency_experience',
                            fieldType: QuestionType.RADIO,
                            label: 'Software Agency/Consultancy Experience? 🤝',
                            description: '',
                            required: true,
                            order: 16,
                            weight: 2,
                            scoreType: 'COMPLETION',
                            options: [
                                'Yes ✅',
                                'No ❌',
                                'Built my own & hired people 🏗️'
                            ]
                        },
                        {
                            fieldKey: 'longest_stay',
                            fieldType: QuestionType.RADIO,
                            label: 'Longest Stay at One Company ⏳',
                            description: '',
                            required: true,
                            order: 17,
                            weight: 2,
                            scoreType: 'COMPLETION',
                            options: [
                                '<1 year 📆',
                                '1–2 years 📆',
                                '3–4 years 📅',
                                '5+ years 🏆'
                            ]
                        },
                        {
                            fieldKey: 'education_level',
                            fieldType: QuestionType.RADIO,
                            label: 'Education Level',
                            description: '',
                            required: true,
                            order: 18,
                            weight: 2,
                            scoreType: 'COMPLETION',
                            options: [
                                'I FINISHED my High School AND I STOPPED there (no higher-level education)🎒',
                                'I FINISHED my Bachelor\'s Degree I am not in school. 🎓',
                                'I FINISHED my Master\'s Degree AND I am not in school. ✨',
                                'I FINISHED my Ph.D Degree AND I am not in school. 🏅'
                            ]
                        },
                        {
                            fieldKey: 'computer_specs',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'Your Work From Home Computer Specs (PLEASE be specific about RAM? CPU? SSD? Dual Monitor Setup? Desktop/Laptop?) 💻',
                            description: '',
                            required: true,
                            order: 19,
                            weight: 2,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'internet_download',
                            fieldType: QuestionType.TEXT,
                            label: 'Internet Download Speed ⚡⬇️',
                            description: '',
                            required: true,
                            order: 20,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'internet_upload',
                            fieldType: QuestionType.TEXT,
                            label: 'Internet Upload Speed ⚡⬆️',
                            description: '',
                            required: true,
                            order: 21,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        }
                    ]
                },
                {
                    id: 'skillset',
                    title: 'Skillset (Section 2 of 3)',
                    description: 'IMPORTANT INFO ⚠️ Describe your skillset based on the points below: 1 = you know nothing about it, 2 = you have heard about it and maybe looked at articles and videos about it, 3 = you get its high level concepts but have never applied it, 4-5 = you have done minimal application of the skill, 6-7 = you have recently worked on it for around 3-6 months time, 8 = You have recently worked on this tool for a full year (12 months or more!), 9 = You have recently worked on this tool for a full 18 months, 10 = You have recently worked on this tool for a full 2+ years (24 months or more!)',
                    order: 3,
                    questions: [
                        {
                            fieldKey: 'years_total_experience',
                            fieldType: QuestionType.TEXT,
                            label: 'Total Years Of Working Experience (No Internship Included) ⌛',
                            description: '',
                            required: true,
                            order: 1,
                            weight: 2,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'years_software_experience',
                            fieldType: QuestionType.TEXT,
                            label: 'Total Years of Software Engineering Experience (No Internship Included) 💻',
                            description: '',
                            required: true,
                            order: 2,
                            weight: 2,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'year_started_programming',
                            fieldType: QuestionType.TEXT,
                            label: 'Year You Started Programming (ex: 2022) 🗓️',
                            description: '',
                            required: true,
                            order: 3,
                            weight: 2,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'python_skill',
                            fieldType: QuestionType.SCALE,
                            label: 'Python 🐍',
                            description: '',
                            required: true,
                            order: 4,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                            validation: {
                                min: 1,
                                max: 10
                            }
                        },
                        {
                            fieldKey: 'javascript_skill',
                            fieldType: QuestionType.SCALE,
                            label: 'JavaScript / Typescript 🟨',
                            description: '',
                            required: true,
                            order: 5,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                            validation: {
                                min: 1,
                                max: 10
                            }
                        },
                        {
                            fieldKey: 'webscraping_skill',
                            fieldType: QuestionType.SCALE,
                            label: 'Playwright (or Cypress / Selenium / any web scrapers) 🕷️',
                            description: '',
                            required: true,
                            order: 6,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                            validation: {
                                min: 1,
                                max: 10
                            }
                        },
                        {
                            fieldKey: 'cybersecurity_skill',
                            fieldType: QuestionType.SCALE,
                            label: 'Cybersecurity or Reverse-Engineering Capabilities (Burpsuite, mitmproxy, DevTools Network, DevSecOps) 🔐',
                            description: '',
                            required: true,
                            order: 7,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                            validation: {
                                min: 1,
                                max: 10
                            }
                        },
                        {
                            fieldKey: 'devops_skill',
                            fieldType: QuestionType.SCALE,
                            label: 'DevOps Capabilities (Ansible, Docker, GitHub Actions, Setting Up Infra For Web Apps, AWS...) ⚙️',
                            description: '',
                            required: true,
                            order: 8,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                            validation: {
                                min: 1,
                                max: 10
                            }
                        },
                        {
                            fieldKey: 'ml_skill',
                            fieldType: QuestionType.SCALE,
                            label: 'Machine Learning Engineering Capabilities (Managing Big Datasets, Fine-Tuning LLMs, Custom Models using opencv, tensorflow, scapy or equivalent) 🤖',
                            description: '',
                            required: true,
                            order: 9,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                            validation: {
                                min: 1,
                                max: 10
                            }
                        },
                        {
                            fieldKey: 'api_skill',
                            fieldType: QuestionType.SCALE,
                            label: 'API Development 🔌',
                            description: '',
                            required: true,
                            order: 10,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                            validation: {
                                min: 1,
                                max: 10
                            }
                        },
                        {
                            fieldKey: 'db_skill',
                            fieldType: QuestionType.SCALE,
                            label: 'DB Schema Management + Migrations 🗄️',
                            description: '',
                            required: true,
                            order: 11,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                            validation: {
                                min: 1,
                                max: 10
                            }
                        },
                        {
                            fieldKey: 'leadership_skill',
                            fieldType: QuestionType.SCALE,
                            label: 'Dev Management / Leadership Experience (School does not count) 👥',
                            description: '',
                            required: true,
                            order: 12,
                            weight: 2,
                            scoreType: 'WEIGHTED',
                            validation: {
                                min: 1,
                                max: 10
                            }
                        },
                        {
                            fieldKey: 'design_skill',
                            fieldType: QuestionType.SCALE,
                            label: 'Web / Product Design Principles (Figma, CSS, UI/UX) 🎨',
                            description: '',
                            required: true,
                            order: 13,
                            weight: 2,
                            scoreType: 'WEIGHTED',
                            validation: {
                                min: 1,
                                max: 10
                            }
                        }
                    ]
                },
                {
                    id: 'final_questions',
                    title: 'Final Questions (Section 3 of 3)',
                    description: 'Let me get to know you well!',
                    order: 4,
                    questions: [
                        {
                            fieldKey: 'working_style',
                            fieldType: QuestionType.GRID,
                            label: 'Your working style?',
                            description: 'There are no right or wrong answers; we value every work style and are looking for diversification.',
                            required: true,
                            order: 1,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                            options: [
                                'A whole morning of coding with notifications silenced leaves me feeling refreshed. ⏳',
                                'Giving a live demo of my latest feature to the team energises me. 🎤',
                                'I often join an open voice channel while coding, even if no one\'s actively chatting. 📻',
                                'I respond to Slack pings right away, even when deep in code, so no one stays blocked. 🚀',
                                'I prefer recording a quick Loom walkthrough of my PR over waiting for a live meeting. 📹',
                                'I block calendar windows for uninterrupted focus time and guard them from meetings. 🛡️'
                            ]
                        },
                        {
                            fieldKey: 'introvert_extrovert',
                            fieldType: QuestionType.RADIO,
                            label: 'Do you find yourself to be more introverted or extroverted in work environments?',
                            description: '',
                            required: true,
                            order: 2,
                            weight: 2,
                            scoreType: 'COMPLETION',
                            options: [
                                'Introverted',
                                'Extroverted'
                            ]
                        },
                        {
                            fieldKey: 'comfortable_tech',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'Most comfortable programming languages / tech stacks? Tasks you are the most comfortable with? API? DevOps? ML/AI Fine-Tuning? Web Scraping? Don\'t give a huge list, focus on the top stuff you are truly awesome at. 🚀',
                            description: '',
                            required: true,
                            order: 3,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                        },
                        {
                            fieldKey: 'product_interest',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'Which of our products excites you most — and one feature you\'d ship first? How will your skills move that feature forward in 90 days?',
                            description: '',
                            required: true,
                            order: 4,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                        },
                        {
                            fieldKey: 'best_work',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'Please highlight your very best work here or your biggest accomplishment! 🏅',
                            description: '',
                            required: true,
                            order: 5,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                        },
                        {
                            fieldKey: 'good_vs_great_engineer',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'In your opinion, what separates a good engineer from a great engineer? 🌟',
                            description: '',
                            required: true,
                            order: 6,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                        },
                        {
                            fieldKey: 'failure_moment',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'Tell me a moment where you failed or made a mistake and how did you handle it? 📉',
                            description: '',
                            required: true,
                            order: 7,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                        },
                        {
                            fieldKey: 'devops_knowledge',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'Let\'s test your DevOps knowledge ♾️ Quick estimation #1: How much time would it take for you to build a CI pipeline for a NextJS app to support: - Type checks - Linting (with ESLint) - Prettier - Build Check? Elaborate on why that much time is needed. Quick estimation #2: How much time would it take for you to build a CD pipeline for a NextJS app to deploy automatically to a VPS (EC2 instance)? If you do not know, write N/A.',
                            description: '',
                            required: true,
                            order: 8,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                        },
                        {
                            fieldKey: 'webscraping_knowledge',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'Let\'s test your web scraping knowledge 🔍 Can you get me a clean and maintainable XPath / CSS Selector of the text below? When I say maintainable, I mean an XPath that is more than likely to not change (usually because of minimal HTML frontend changes). If you do not know, write N/A.',
                            description: '',
                            required: true,
                            order: 9,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                        },
                        {
                            fieldKey: 'ai_knowledge',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'Let\'s test your AI knowledge 🤖 uNotes hosts over 40 000 documents. As of now, to classify a document, we only dump it to GPT to get information about it: Which school is it from? Which course is it from? What type of document is it? etc... From GPTs response, we use fuzzy search to pair the document to the right schools and courses. You can sign up then go to https://unotes.net/documents/new or go to the "Add" section in the navbar to see how the documents are classified. Using AI, how would you improve the classification process? If you do not know, write N/A.',
                            description: '',
                            required: true,
                            order: 10,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                        },
                        {
                            fieldKey: 'security_knowledge',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'Let\'s test your security (+ web scraping) knowledge 🔐 https://aishorty.com has a few vulnerabilities lurking in its API. Open DevTools, reload the homepage, and inspect the getRecentArticles() network request. What looks off about the request or response? How you would fix or harden this endpoint in production? If you do not know, write N/A.',
                            description: '',
                            required: true,
                            order: 11,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                        },
                        {
                            fieldKey: 'differentiate_yourself',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'This is where you differentiate between you and other candidates. Prove to me why you would make a great fit! 💪',
                            description: '',
                            required: true,
                            order: 12,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                        },
                        {
                            fieldKey: 'english_skills',
                            fieldType: QuestionType.RADIO,
                            label: 'English Skills',
                            description: '',
                            required: true,
                            order: 13,
                            weight: 2,
                            scoreType: 'COMPLETION',
                            options: [
                                'Begineer (A1) 🍼',
                                'Novice (A2)👶',
                                'Intermediate (B1)👫',
                                'Advanced (B2)🗣️',
                                'Fluent (C1)🦾',
                                'Native (C2)🦅'
                            ]
                        },
                        {
                            fieldKey: 'expected_salary',
                            fieldType: QuestionType.RADIO,
                            label: 'Expected Monthly Base Salary (Make sure to consider our perks!) 💰',
                            description: '',
                            required: true,
                            order: 14,
                            weight: 2,
                            scoreType: 'COMPLETION',
                            options: [
                                '1500-2000 TND',
                                '2000-2500 TND',
                                '3000-3500 TND',
                                '3500-4000 TND',
                                '4000-4500 TND',
                                'Other'
                            ]
                        },
                        {
                            fieldKey: 'references',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'Highlight the contact information of references who have previously managed you! 📇',
                            description: '',
                            required: true,
                            order: 15,
                            weight: 2,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'start_date',
                            fieldType: QuestionType.RADIO,
                            label: 'When can you start if you were chosen? 🕒',
                            description: '',
                            required: true,
                            order: 16,
                            weight: 2,
                            scoreType: 'COMPLETION',
                            options: [
                                'Immediately⚡',
                                '1-2 Weeks From Now 📆',
                                '1 Month From Now 📆',
                                'Other'
                            ]
                        },
                        {
                            fieldKey: 'questions_about_job',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'What are your questions that I can answer about the job opportunity❓(Optional)',
                            description: '',
                            required: false,
                            order: 17,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'what_made_you_apply',
                            fieldType: QuestionType.CHECKBOX,
                            label: 'What made you apply? (Optional)',
                            description: '',
                            required: false,
                            order: 18,
                            weight: 1,
                            scoreType: 'COMPLETION',
                            options: [
                                'The introduction video, showing the CEO and his values',
                                'The faith-based values of the company',
                                'The flexible remote policy',
                                'The chance to make an impact quickly',
                                'The competitive compensation and perks',
                                'The cutting-edge technology stack',
                                'Other'
                            ]
                        },
                        {
                            fieldKey: 'frog_emoji_test',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'BEFORE YOU SUBMIT - Connect with me on Linkedin: https://www.linkedin.com/in/amin-dhouib/ Send me a follow on my Instagram: https://www.instagram.com/amin.dhou/ This will make it easier for me to message you back about your application if selected. Thank you for applying! Best of luck to all of you! 😊 Send a frog emoji in this field if you read through the entire description.',
                            description: '',
                            required: false,
                            order: 19,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        }
                    ]
                }
            ]
        }
    },
    {
        id: 'growth-marketer',
        meta: {
            title: 'Growth Marketer With SaaS Experience',
            department: 'Marketing',
            type: 'Full-time',
            level: 'Mid',
            location: 'Remote (Global)',
            description: 'Growth Marketers Wanting to Scale MVPs, Get A Great Job Security And Get Rewarded With High Commissions: Join Us and Apply Here! Devino Solutions, a remote-first software consultancy that also ships its own apps.',
            featured: true,
        },

        requirements: [
            '3+ years hands-on digital marketing and sales (SaaS or consumer web)',
            'Proven success with SEO, SEM, paid social & CRO',
            'Outbound outreach & 1:1 sales skills — cold email, LinkedIn DMs, demo calls that close',
            'Copywriting & storytelling skills that convert browsers into users',
            'Community management & engagement on Reddit and Discord',
            'Confident with GA4, Mixpanel, Hotjar, Looker / Data Studio for insight & reporting',
            'Experience owning email & lifecycle automation (HubSpot, Customer.io, Braze or similar)',
        ],

        benefits: [
            'Work from anywhere, anytime 🏖️',
            'Rotate across projects — never get stuck working on only 1 project 🧩',
            'Rapid career growth in a lean team 🚀',
            'Flexible schedule with near-zero meetings 📅',
            'No micromanagement 🤝',
            'Organized sprints: every Monday you see all your tasks 🗂️',
            'Feedback is welcomed; you can shape the roadmap 💬',
            'Unlimited paid time off 🏝️',
            'Respect for faith and culture 🕌',
        ],

        skills: [
            'Digital Marketing', 'SEO', 'SEM', 'Paid Social', 'CRO', 'Cold Email', 'LinkedIn Sales',
            'Copywriting', 'Community Management', 'Reddit', 'Discord', 'GA4', 'Mixpanel', 'Hotjar',
            'Email Marketing', 'Marketing Automation', 'HubSpot', 'Webflow', 'Figma', 'Video Editing'
        ],

        // Legacy form configuration for backward compatibility
        form: [],

        // Generic evaluation criteria used by AI
        evaluationCriteria: {
            'Marketing Experience': 'Proven track record with digital marketing, SEM, SEO, social media campaigns, and measurable results',
            'Sales & Outreach': 'Demonstrated success with outbound sales, cold email campaigns, community management, and lead generation',
            'Analytics & Data': 'Experience with GA4, Mixpanel, Hotjar, creating dashboards, and making data-driven decisions',
            'Content & Creative': 'Strong copywriting skills, video creation, storytelling ability, and brand awareness',
            'Technical Skills': 'Familiarity with marketing automation tools, CRM systems, and basic coding/scripting abilities'
        },

        // New comprehensive form configuration
        formConfig: {
            id: 'growth-marketer-application',
            positionId: 'growth-marketer',
            title: 'Growth Marketer Application',
            description: 'Apply for Growth Marketer position at Devino Solutions',
            sections: [
                {
                    id: 'contact-info',
                    title: 'Contact and Basic Info',
                    description: 'Section 1 of 4',
                    order: 0,
                    questions: [
                        {
                            fieldKey: 'full_name',
                            fieldType: QuestionType.TEXT,
                            label: 'Full Name 📝',
                            description: '',
                            required: true,
                            order: 0,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'country_residence',
                            fieldType: QuestionType.TEXT,
                            label: 'Country of Residence 🌍',
                            description: '',
                            required: true,
                            order: 1,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'resume_cv',
                            fieldType: QuestionType.FILE,
                            label: 'Upload Resume / CV 📄',
                            description: 'Upload 1 supported file. Max 10 MB.',
                            required: true,
                            order: 2,
                            weight: 2,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'contact_linkedin',
                            fieldType: QuestionType.TEXT,
                            label: 'Contact Info (LinkedIn) 💼 [Preferred]',
                            description: 'The more options, the better, as it will make it easier for me to reach back to you for the next steps.',
                            required: false,
                            order: 3,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'contact_whatsapp',
                            fieldType: QuestionType.TEXT,
                            label: 'Contact Info (WhatsApp) 📱',
                            description: '',
                            required: false,
                            order: 4,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'contact_email',
                            fieldType: QuestionType.EMAIL,
                            label: 'Contact Info (Email Address) 📧',
                            description: '',
                            required: true,
                            order: 5,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'contact_facebook',
                            fieldType: QuestionType.TEXT,
                            label: 'Contact Info (Facebook) 📘',
                            description: '',
                            required: false,
                            order: 6,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'contact_instagram',
                            fieldType: QuestionType.TEXT,
                            label: 'Contact Info (Instagram) 📸',
                            description: '',
                            required: false,
                            order: 7,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'portfolio_page',
                            fieldType: QuestionType.URL,
                            label: 'Portfolio Page (Optional) 🌐',
                            description: '',
                            required: false,
                            order: 8,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'employment_status',
                            fieldType: QuestionType.RADIO,
                            label: 'Employment Status 💼',
                            description: '',
                            required: true,
                            order: 9,
                            weight: 1,
                            scoreType: 'COMPLETION',
                            options: [
                                'No current job, seeking full-time 🚀',
                                'Have a job, open to new roles 🔄'
                            ]
                        },
                        {
                            fieldKey: 'why_looking_new_opportunities',
                            fieldType: QuestionType.RADIO,
                            label: 'If you do have a job, why are you looking for new opportunities?',
                            description: '',
                            required: true,
                            order: 10,
                            weight: 1,
                            scoreType: 'COMPLETION',
                            options: [
                                'N/A (I don\'t have a job at the moment) 🚫',
                                'Unfair compensation package 💸',
                                'Poor work–life balance / excessive overtime 🕰️',
                                'Limited growth / promotion path🔒',
                                'Need fresh challenges or new tech to learn 🧠',
                                'Contract / project ending soon 🛑',
                                'Want remote or more flexible schedule 🕒',
                                'Company instability (layoffs, budget cuts, unclear future) 📉',
                                'Misalignment with personal values or ethics ❌',
                                'Other'
                            ]
                        },
                        {
                            fieldKey: 'current_job_likes_dislikes',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'Elaborate on what you like and dislike about your current job. Write "N/A" if you are not employed.',
                            description: '',
                            required: true,
                            order: 11,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'startup_experience',
                            fieldType: QuestionType.RADIO,
                            label: 'Previously Worked At A Startup? 🚀',
                            description: '',
                            required: true,
                            order: 12,
                            weight: 1,
                            scoreType: 'COMPLETION',
                            options: [
                                '2+ years ⏳',
                                '~1 year ⏳',
                                '<1 year ⏳',
                                'Never ❌'
                            ]
                        },
                        {
                            fieldKey: 'freelancer_experience',
                            fieldType: QuestionType.RADIO,
                            label: 'Previously Worked As A Full-Time Freelancer? 🛠️',
                            description: '',
                            required: true,
                            order: 13,
                            weight: 1,
                            scoreType: 'COMPLETION',
                            options: [
                                'Yes, I have worked on platforms like Upwork and Fiverr 🌐',
                                'Yes but I only did freelancing locally 🏠',
                                'No ❌'
                            ]
                        },
                        {
                            fieldKey: 'agency_experience',
                            fieldType: QuestionType.RADIO,
                            label: 'Marketing & Sales Agency/Consultancy Experience? 🤝',
                            description: '',
                            required: true,
                            order: 14,
                            weight: 1,
                            scoreType: 'COMPLETION',
                            options: [
                                'Yes ✅',
                                'No ❌',
                                'Built my own & hired people 🏗️'
                            ]
                        },
                        {
                            fieldKey: 'longest_company_stay',
                            fieldType: QuestionType.RADIO,
                            label: 'Longest Stay at One Company ⏳',
                            description: '',
                            required: true,
                            order: 15,
                            weight: 1,
                            scoreType: 'COMPLETION',
                            options: [
                                '<1 year 📆',
                                '1–2 years 📆',
                                '3–4 years 📅',
                                '5+ years 🏆'
                            ]
                        },
                        {
                            fieldKey: 'education_level',
                            fieldType: QuestionType.RADIO,
                            label: 'Education Level',
                            description: '',
                            required: true,
                            order: 16,
                            weight: 1,
                            scoreType: 'COMPLETION',
                            options: [
                                'I FINISHED my High School AND I STOPPED there (no higher-level education)🎒',
                                'I FINISHED my Bachelor\'s Degree I am not in school. 🎓',
                                'I FINISHED my Master\'s Degree AND I am not in school. ✨',
                                'I FINISHED my Ph.D Degree AND I am not in school. 🏅'
                            ]
                        },
                        {
                            fieldKey: 'computer_specs',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'Your Work From Home Computer Specs (PLEASE be specific about RAM? CPU? SSD? Dual Monitor Setup? Desktop/Laptop?) 💻',
                            description: '',
                            required: true,
                            order: 17,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'internet_download_speed',
                            fieldType: QuestionType.TEXT,
                            label: 'Internet Download Speed ⚡⬇️',
                            description: '',
                            required: true,
                            order: 18,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'internet_upload_speed',
                            fieldType: QuestionType.TEXT,
                            label: 'Internet Upload Speed ⚡⬆️',
                            description: '',
                            required: true,
                            order: 19,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        }
                    ]
                },
                {
                    id: 'skillset',
                    title: 'Skillset',
                    description: 'Section 2 of 4',
                    order: 1,
                    questions: [
                        {
                            fieldKey: 'total_work_experience',
                            fieldType: QuestionType.NUMBER,
                            label: 'Total Years Of Working Experience (No Internship Included) ⌛',
                            description: '',
                            required: true,
                            order: 0,
                            weight: 2,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'marketing_sales_experience',
                            fieldType: QuestionType.NUMBER,
                            label: 'Total Years of Marketing & Sales Experience (No internship included nor Clerk Shop / Marketplace selling experiences) 💻',
                            description: '',
                            required: true,
                            order: 1,
                            weight: 2,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'programming_start_year',
                            fieldType: QuestionType.NUMBER,
                            label: 'Year You Started Programming (ex: 2022) 🗓️',
                            description: '',
                            required: true,
                            order: 2,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'seo_content_strategy',
                            fieldType: QuestionType.SCALE,
                            label: 'SEO / Content Strategy / SEO Blog Posts 🔍',
                            description: 'IMPORTANT INFO ⚠️ Describe your skillset based on the points below: 1 = you know nothing about it, 2 = you have heard about it and maybe looked at articles and videos about it, 3 = you get its high level concepts but have never applied it, 4-5 = you have done minimal application of the skill, 6-7 = you have recently worked on it for around 3-6 months time, 8 = You have recently worked on this tool for a full year (12 months or more!), 9 = You have recently worked on this tool for a full 18 months, 10 = You have recently worked on this tool for a full 2+ years (24 months or more!)',
                            required: true,
                            order: 3,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                            validation: { min: 1, max: 10 }
                        },
                        {
                            fieldKey: 'paid_ads',
                            fieldType: QuestionType.SCALE,
                            label: 'Paid Ads (Google, Meta, LinkedIn, TikTok) 💰',
                            description: '',
                            required: true,
                            order: 4,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                            validation: { min: 1, max: 10 }
                        },
                        {
                            fieldKey: 'email_marketing',
                            fieldType: QuestionType.SCALE,
                            label: 'Email Marketing & Automation 📧',
                            description: '',
                            required: true,
                            order: 5,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                            validation: { min: 1, max: 10 }
                        },
                        {
                            fieldKey: 'outbound_sales',
                            fieldType: QuestionType.SCALE,
                            label: 'Outbound Outreach & 1:1 Sales 📞',
                            description: '',
                            required: true,
                            order: 6,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                            validation: { min: 1, max: 10 }
                        },
                        {
                            fieldKey: 'demo_videos',
                            fieldType: QuestionType.SCALE,
                            label: 'Creating Demo Videos To Showcase App/Tool🎬',
                            description: '',
                            required: false,
                            order: 7,
                            weight: 2,
                            scoreType: 'WEIGHTED',
                            validation: { min: 1, max: 10 }
                        },
                        {
                            fieldKey: 'community_management',
                            fieldType: QuestionType.SCALE,
                            label: 'Community Management (Reddit / Discord / Slack) 👥',
                            description: '',
                            required: true,
                            order: 8,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                            validation: { min: 1, max: 10 }
                        },
                        {
                            fieldKey: 'data_analytics',
                            fieldType: QuestionType.SCALE,
                            label: 'Data Analytics & Dashboards (GA4, Mixpanel, Hotjar) 📊',
                            description: '',
                            required: true,
                            order: 9,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                            validation: { min: 1, max: 10 }
                        },
                        {
                            fieldKey: 'copywriting',
                            fieldType: QuestionType.SCALE,
                            label: 'Copywriting & Storytelling ✍️',
                            description: '',
                            required: true,
                            order: 10,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                            validation: { min: 1, max: 10 }
                        },
                        {
                            fieldKey: 'ab_testing_cro',
                            fieldType: QuestionType.SCALE,
                            label: 'A/B Testing & CRO 🧪',
                            description: '',
                            required: true,
                            order: 11,
                            weight: 3,
                            scoreType: 'WEIGHTED',
                            validation: { min: 1, max: 10 }
                        },
                        {
                            fieldKey: 'nocode_landing_pages',
                            fieldType: QuestionType.SCALE,
                            label: 'Webflow / Framer / Wix (No‑code Landing Pages) 🌐',
                            description: '',
                            required: true,
                            order: 12,
                            weight: 2,
                            scoreType: 'WEIGHTED',
                            validation: { min: 1, max: 10 }
                        },
                        {
                            fieldKey: 'brand_visual_design',
                            fieldType: QuestionType.SCALE,
                            label: 'Brand & Visual Design 🖌️',
                            description: '',
                            required: true,
                            order: 13,
                            weight: 2,
                            scoreType: 'WEIGHTED',
                            validation: { min: 1, max: 10 }
                        },
                        {
                            fieldKey: 'ui_ux_design',
                            fieldType: QuestionType.SCALE,
                            label: 'Figma / Adobe XD / Sketch (UI/UX) 🎨',
                            description: '',
                            required: true,
                            order: 14,
                            weight: 2,
                            scoreType: 'WEIGHTED',
                            validation: { min: 1, max: 10 }
                        },
                        {
                            fieldKey: 'video_editing',
                            fieldType: QuestionType.SCALE,
                            label: 'Video Editing / Motion 🎬',
                            description: '',
                            required: true,
                            order: 15,
                            weight: 2,
                            scoreType: 'WEIGHTED',
                            validation: { min: 1, max: 10 }
                        },
                        {
                            fieldKey: 'scripting_automations',
                            fieldType: QuestionType.SCALE,
                            label: 'JavaScript / Python Scripting for Automations 🖥️',
                            description: '',
                            required: true,
                            order: 16,
                            weight: 2,
                            scoreType: 'WEIGHTED',
                            validation: { min: 1, max: 10 }
                        },
                        {
                            fieldKey: 'crm_martech',
                            fieldType: QuestionType.SCALE,
                            label: 'CRM & MarTech Stack (HubSpot, Segment, Zapier) 🛠️',
                            description: '',
                            required: true,
                            order: 17,
                            weight: 2,
                            scoreType: 'WEIGHTED',
                            validation: { min: 1, max: 10 }
                        }
                    ]
                },
                {
                    id: 'working-style',
                    title: 'Working Style & Experience',
                    description: 'Section 3 of 4',
                    order: 2,
                    questions: [
                        {
                            fieldKey: 'working_style_notifications',
                            fieldType: QuestionType.SCALE,
                            label: 'A full morning of crafting ads & copy with notifications silenced leaves me refreshed. ⏳',
                            description: 'Your working style? There are no right or wrong answers; we value every work style and are looking for diversification.',
                            required: true,
                            order: 0,
                            weight: 1,
                            scoreType: 'COMPLETION',
                            validation: { min: 1, max: 5 },
                            options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
                        },
                        {
                            fieldKey: 'working_style_presentation',
                            fieldType: QuestionType.SCALE,
                            label: 'Giving a live walkthrough of campaign results to the team energises me. 🎤',
                            description: '',
                            required: true,
                            order: 1,
                            weight: 1,
                            scoreType: 'COMPLETION',
                            validation: { min: 1, max: 5 },
                            options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
                        },
                        {
                            fieldKey: 'working_style_voice_channel',
                            fieldType: QuestionType.SCALE,
                            label: 'I hop into an open voice channel while brainstorming creatives, even if no one\'s actively chatting. 📻',
                            description: '',
                            required: true,
                            order: 2,
                            weight: 1,
                            scoreType: 'COMPLETION',
                            validation: { min: 1, max: 5 },
                            options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
                        },
                        {
                            fieldKey: 'working_style_slack_response',
                            fieldType: QuestionType.SCALE,
                            label: 'I respond to Slack pings promptly, even when deep in analytics, so blockers clear fast. 🚀',
                            description: '',
                            required: true,
                            order: 3,
                            weight: 1,
                            scoreType: 'COMPLETION',
                            validation: { min: 1, max: 5 },
                            options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
                        },
                        {
                            fieldKey: 'working_style_loom_vs_meeting',
                            fieldType: QuestionType.SCALE,
                            label: 'I prefer recording a quick Loom breakdown of a landing‑page tweak over scheduling a meeting. 📹',
                            description: '',
                            required: true,
                            order: 4,
                            weight: 1,
                            scoreType: 'COMPLETION',
                            validation: { min: 1, max: 5 },
                            options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
                        },
                        {
                            fieldKey: 'working_style_deep_focus',
                            fieldType: QuestionType.SCALE,
                            label: 'I block calendar windows for deep creative focus and guard them from meetings. 🛡️',
                            description: '',
                            required: true,
                            order: 5,
                            weight: 1,
                            scoreType: 'COMPLETION',
                            validation: { min: 1, max: 5 },
                            options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
                        },
                        {
                            fieldKey: 'introvert_extrovert',
                            fieldType: QuestionType.RADIO,
                            label: 'Do you find yourself to be more introverted or extroverted in work environments?',
                            description: '',
                            required: true,
                            order: 6,
                            weight: 1,
                            scoreType: 'COMPLETION',
                            options: ['Introverted', 'Extroverted']
                        },
                        {
                            fieldKey: 'best_work_accomplishment',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'Please highlight your very best work here or your biggest accomplishment! 🏅',
                            description: '',
                            required: true,
                            order: 7,
                            weight: 3,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'failure_mistake_story',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'Tell me a moment where you failed or made a mistake and how did you handle it? 📉',
                            description: '',
                            required: true,
                            order: 8,
                            weight: 2,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'product_growth_experiment',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'Which of our products excites you most? Pitch a single growth experiment you\'d ship for your favorite tool in 30 days. What metric, hypothesis, rollout plan & expected lift?',
                            description: '',
                            required: true,
                            order: 9,
                            weight: 3,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'reddit_outreach_strategy',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'You are tasked to outreach Reddit moderators to try to collaborate with them and allow us to post about uNotes. How would you go about it? Which subreddits would you tackle? What would be your cold-opener?',
                            description: '',
                            required: true,
                            order: 10,
                            weight: 3,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'dashboard_screenshot',
                            fieldType: QuestionType.FILE,
                            label: 'Attach (blurred) screenshot of your favorite Looker / Data Studio dashboard (Hotjar, Google Analytics etc...) and label the KPI you check every Monday. And how does these KPI metrics influence your or your team\'s decisions?',
                            description: 'Upload 1 supported file: PDF, document, drawing, image, presentation, spreadsheet, or video. Max 10 MB.',
                            required: true,
                            order: 11,
                            weight: 2,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'kpi_influence_decisions',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'From the question above, how does these KPI metrics influence your or your team\'s decisions?',
                            description: '',
                            required: true,
                            order: 12,
                            weight: 2,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'social_media_creators',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'Name two social media creators whose content matches uNotes, Shorty, Caramel or UpUp that would be worth partnering up with.',
                            description: '',
                            required: true,
                            order: 13,
                            weight: 2,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'why_hire_you',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'This is where you differentiate between you and other candidates. Convince us in one paragraph why you are our growth engine. 💪',
                            description: '',
                            required: true,
                            order: 14,
                            weight: 3,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'english_skills',
                            fieldType: QuestionType.RADIO,
                            label: 'English Skills',
                            description: '',
                            required: true,
                            order: 15,
                            weight: 1,
                            scoreType: 'COMPLETION',
                            options: [
                                'Beginner (A1) 🍼',
                                'Novice (A2)👶',
                                'Intermediate (B1)👫',
                                'Advanced (B2)🗣️',
                                'Fluent (C1)🦾',
                                'Native (C2)🦅'
                            ]
                        },
                        {
                            fieldKey: 'french_skills',
                            fieldType: QuestionType.RADIO,
                            label: 'French Skills',
                            description: '',
                            required: true,
                            order: 16,
                            weight: 1,
                            scoreType: 'COMPLETION',
                            options: [
                                'Beginner (A1) 🍼',
                                'Novice (A2)👶',
                                'Intermediate (B1)👫',
                                'Advanced (B2)🗣️',
                                'Fluent (C1)🦾',
                                'Native (C2)🦅'
                            ]
                        },
                        {
                            fieldKey: 'expected_salary',
                            fieldType: QuestionType.RADIO,
                            label: 'Expected Monthly Salary (Keep In Mind Of The Exclusive Perks + Commission Structure) 💰',
                            description: '',
                            required: true,
                            order: 17,
                            weight: 1,
                            scoreType: 'COMPLETION',
                            options: [
                                '1500-2000 TND',
                                '2000-2500 TND',
                                '3000-3500 TND',
                                '3500-4000 TND',
                                '4000-4500 TND',
                                'Other'
                            ]
                        },
                        {
                            fieldKey: 'references',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'Highlight the contact information of references who have previously managed you! 📇',
                            description: '',
                            required: true,
                            order: 18,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'start_date',
                            fieldType: QuestionType.RADIO,
                            label: 'When can you start if you were chosen? 🕒',
                            description: '',
                            required: true,
                            order: 19,
                            weight: 1,
                            scoreType: 'COMPLETION',
                            options: [
                                'Immediately⚡',
                                '1-2 Weeks From Now 📆',
                                '1 Month From Now 📆',
                                'Other'
                            ]
                        }
                    ]
                },
                {
                    id: 'final-questions',
                    title: 'Final Questions',
                    description: 'Section 4 of 4',
                    order: 3,
                    questions: [
                        {
                            fieldKey: 'referral_bonus',
                            fieldType: QuestionType.TEXTAREA,
                            label: '💸 WIN A 1000 TND BONUS FOR A SUCCESSFUL REFERRAL!! 💸 We are also looking for: An AI Data Engineers With DevOps Capabilities - https://devino.ca/careers/ai-data-engineer, Full-Stack Engineers w/ UI/UX Design Skills - https://devino.ca/careers/full-stack-engineer, A Growth Marketer With SAAS Experience - https://devino.ca/careers/growth-marketer. If you know anybody who fits these roles forward them the form and write the referral below. If we hire him and he is great fit to our team, you win 1000 TND. Enter the full name of the people you referred including their contact information. (Optional)',
                            description: 'Another way to submit a referral is by sending me a message through LinkedIn. Make sure that the referred candidate has submitted his/her application before messaging me. Make sure to tell me which job he/she applied for. My Linkedin: https://www.linkedin.com/in/amin-dhouib/ My Instagram: https://www.instagram.com/amin.dhou/',
                            required: false,
                            order: 0,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'questions_about_job',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'What are your questions that I can answer about the job opportunity❓(Optional)',
                            description: '',
                            required: false,
                            order: 1,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        },
                        {
                            fieldKey: 'what_made_you_apply',
                            fieldType: QuestionType.CHECKBOX,
                            label: 'What made you apply? (Optional)',
                            description: '',
                            required: false,
                            order: 2,
                            weight: 1,
                            scoreType: 'COMPLETION',
                            options: [
                                'The introduction video, showing the CEO and his values',
                                'The faith-based values of the company',
                                'The flexible remote policy',
                                'The chance to make an impact quickly',
                                'The competitive compensation and perks',
                                'The cutting-edge technology stack',
                                'Other'
                            ]
                        },
                        {
                            fieldKey: 'frog_emoji_test',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'BEFORE YOU SUBMIT - Connect with me on Linkedin: https://www.linkedin.com/in/amin-dhouib/ Send me a follow on my Instagram: https://www.instagram.com/amin.dhou/ This will make it easier for me to message you back about your application if selected. Thank you for applying! Best of luck to all of you! 😊 Send a frog emoji in this field if you read through the entire description.',
                            description: '',
                            required: false,
                            order: 3,
                            weight: 1,
                            scoreType: 'COMPLETION',
                        }
                    ]
                }
            ]
        }
    }
];

// Helper function to get job by ID
export function getJobById(jobId: string): JobWithForm | undefined {
    return jobs.find(job => job.id === jobId);
}
