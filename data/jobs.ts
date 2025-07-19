// data/jobs.ts
import { JobDefinition } from '../lib/scoring/types';
import { FormConfig, FormQuestionConfig, QuestionType, RichContent } from '../lib/forms/form-types';

// Job definition that includes both old scoring system and new form system
export interface JobWithForm extends JobDefinition {
    formConfig: FormConfig;
}

export const jobs: JobWithForm[] = [
    {
        id: 'ai-data-engineer',
        meta: {
            title: 'AI Data Engineers With DevOps Capabilities',
            department: 'Engineering',
            type: 'Full-time',
            level: 'Mid',
            location: 'Remote (Global)',
            description: 'AI Data Engineers With DevOps Capabilities Looking For Fully Flexible Work: Join Us and Apply Here!',
            featured: true,
        },

        requirements: [
            'Solid JavaScript and Python skills',
            'Hands-on with GitHub Actions, Docker, Ansible, NGINX, Cloudflare (and similar tooling)',
            'Web-scraping, reverse engineering or general cybersecurity knowledge', 
            'Machine-learning abilities: spaCy, PyTorch, BERT, OpenCV or fine-tuning LLMs',
            'Managing databases & performing SQL migrations',
            'Comfort building and documenting REST APIs'
        ],

        benefits: [
            'Work from anywhere, anytime 🏖️',
            'Rotate across projects — never get stuck working on only 1 project 🧩', 
            'Rapid career growth in a lean team 🚀',
            'Flexible schedule with near-zero meetings 📅',
            'No micromanagement. Deliver your work your way as long as deadlines are met 🤝',
            'Organized sprints: every Monday you see all your tasks, with almost no mid or end-week surprises 🗂️',
            'Feedback is welcomed; you can shape the roadmap 💬',
            'Need a break? Take one. We offer unlimited paid time off — just keep team goals and deadlines on track 🏝️',
            'Respect for faith and culture – schedule is flex for prayer, fasting, or family events 🕌'
        ],

        skills: [
            'Python', 'JavaScript', 'TypeScript', 'Docker', 'GitHub Actions', 'Ansible', 'NGINX', 'Cloudflare',
            'Web Scraping', 'Cybersecurity', 'Machine Learning', 'PyTorch', 'BERT', 'OpenCV', 'SQL', 'REST APIs'
        ],
        
        form: [],
        
        evaluationCriteria: {
            'Technical Depth': 'Hands-on ML, data engineering tools, proper terminology',
            'Project Complexity': 'End-to-end, scalability, production deployments', 
            'Business Impact': 'Quantifiable results, problem-solving approach',
            'Communication': 'Clarity, structured thinking, professional presentation',
            'Authenticity': 'Specific details, genuine experience'
        },

        formConfig: {
            positionId: 'ai-data-engineer',
            title: 'AI Data Engineer Application',
            description: 'Please complete all sections below.',
            sections: [
                {
                    title: 'Meet The Founder!',
                    description: '',
                    order: 0,
                    questions: [
                        {
                            fieldKey: 'founder_video_display',
                            fieldType: QuestionType.DISPLAY,
                            label: '',
                            description: {
                                type: 'html',
                                content: `
                                    <div style="margin-bottom: 2rem; text-align: center;">
                                        <h3 style="color: #3b82f6; margin: 1.5rem 0 1rem 0;">👋 Meet Amin - Founder of Devino Solutions</h3>
                                        <div style="position: relative; width: 100%; max-width: 560px; margin: 0 auto;">
                                            <iframe 
                                                width="100%" 
                                                height="315" 
                                                src="https://www.youtube.com/embed/2CvyafUM6CM" 
                                                title="Meet the Founder - Amin Dhouib" 
                                                frameborder="0" 
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                                allowfullscreen
                                                style="border-radius: 12px;">
                                            </iframe>
                                        </div>
                                        <p style="margin: 1rem 0; color: #6b7280; font-style: italic;">Learn about our vision, values, and what makes Devino Solutions unique!</p>
                                    </div>
                                `
                            } as RichContent,
                            required: false,
                            order: 0
                        },
                        {
                            fieldKey: 'job_description_display',
                            fieldType: QuestionType.DISPLAY,
                            label: '',
                            description: {
                                type: 'html',
                                content: `
                                    <div style="margin-bottom: 2rem;">
                                        <p><strong>Devino Solutions</strong>, a remote-first software consultancy that also ships its own apps:</p>
                                        <ul style="margin: 1rem 0; padding-left: 1.5rem;">
                                            <li>📚 uNotes — student community document hub → <a href="https://unotes.net" target="_blank" rel="noopener">https://unotes.net</a></li>
                                            <li>🎬 Shorty — AI video & podcast summarizer → <a href="https://aishorty.com" target="_blank" rel="noopener">https://aishorty.com</a></li>
                                            <li>📦 UpUp — open-source file-upload NPM package → <a href="https://useupup.com" target="_blank" rel="noopener">https://useupup.com</a></li>
                                            <li>🤤 Caramel — open-source alternative to Honey (for finding best coupons) → <a href="https://grabcaramel.com" target="_blank" rel="noopener">https://grabcaramel.com</a></li>
                                        </ul>
                                        <p>If you crave variety, learning, and real ownership, you're in the right place — check us out at <a href="https://devino.ca" target="_blank" rel="noopener">https://devino.ca</a>.</p>
                                        
                                        <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e5e7eb;">
                                        
                                        <h3 style="color: #10b981; margin: 1.5rem 0 1rem 0;">Apply if ✅</h3>
                                        <ul style="margin: 1rem 0; padding-left: 1.5rem;">
                                            <li>🏡 You love remote work and hate pointless daily stand-ups.</li>
                                            <li>🤝 You thrive on instant help from a collaborative team when blocked.</li>
                                            <li>🧠 You devour new tech and like hopping between stacks and domains.</li>
                                            <li>💡 You want your ideas shipped fast — no dusty backlogs here.</li>
                                            <li>🚢 You enjoy building, launching, learning, improving — in rapid cycles.</li>
                                            <li>🎯 You like freedom with responsibility: nobody micromanages, but you own your craft.</li>
                                            <li>✂️ You're done with corporate fluff; think startup focus minus the chaos.</li>
                                        </ul>
                                        
                                        <h3 style="color: #ef4444; margin: 1.5rem 0 1rem 0;">Don't apply if ❌</h3>
                                        <ul style="margin: 1rem 0; padding-left: 1.5rem;">
                                            <li>🔒 You want to camp on one stack forever.</li>
                                            <li>🖥️ You crave office vibes or daily sync calls.</li>
                                            <li>🐢 Fast-paced, high-change environments make you uncomfortable.</li>
                                        </ul>
                                        
                                        <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e5e7eb;">
                                        
                                        <h3 style="color: #3b82f6; margin: 1.5rem 0 1rem 0;">Requirements 🔧</h3>
                                        <ul style="margin: 1rem 0; padding-left: 1.5rem;">
                                            <li>Solid JavaScript and Python skills</li>
                                            <li>Hands-on with GitHub Actions, Docker, Ansible, NGINX, Cloudflare (and similar tooling)</li>
                                            <li>Web-scraping, reverse engineering or general cybersecurity knowledge</li>
                                            <li>Machine-learning abilities: spaCy, PyTorch, BERT, OpenCV or fine-tuning LLMs</li>
                                            <li>Managing databases & performing SQL migrations</li>
                                            <li>Comfort building and documenting REST APIs</li>
                                        </ul>
                                        
                                        <h3 style="color: #f59e0b; margin: 1.5rem 0 1rem 0;">Cool to have 🌟</h3>
                                        <ul style="margin: 1rem 0; padding-left: 1.5rem;">
                                            <li>Next.js (or other modern React frameworks)</li>
                                            <li>TypeScript, Tailwind CSS, Prisma, Postgres</li>
                                            <li>Kubernetes, Jenkins and other CI/CD tools</li>
                                            <li>AWS / GCP / DigitalOcean</li>
                                            <li>Stripe or other payment integrations</li>
                                            <li>Experience shipping PWAs or mobile apps (React Native, Expo, Flutter)</li>
                                            <li>Digital marketing background or knowledge</li>
                                        </ul>
                                        
                                        <h3 style="color: #8b5cf6; margin: 1.5rem 0 1rem 0;">What you'll be doing (your roadmap is ready to go with critical priorities!) 🎬</h3>
                                        <ul style="margin: 1rem 0; padding-left: 1.5rem;">
                                            <li>📂 Taming uNotes data: classify thousands of documents, compress PDFs, evolve the DB schema for speed and scale.</li>
                                            <li>⚙️ Owning DevOps: automate CI/CD, streamline GitHub Actions, keep the pipeline green and fast.</li>
                                            <li>☁️ Spinning up new apps: containerize, deploy, and harden anything we dream up.</li>
                                            <li>🕵️‍♂️ Running our lead-gen engine: maintain the automated web-scraping stack that feeds sales.</li>
                                            <li>🧪 Prototyping ML features: help Shorty get smarter summaries, experiment with embeddings, RAG, and LLM fine-tunes.</li>
                                            <li>🗣️ Sharing knowledge: weekly "show-what-you-learned" posts so the whole crew levels up.</li>
                                        </ul>
                                        
                                        <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e5e7eb;">
                                        
                                        <h3 style="color: #6366f1; margin: 1.5rem 0 1rem 0;">Quick facts ⚡</h3>
                                        <ul style="margin: 1rem 0; padding-left: 1.5rem;">
                                            <li>Location: 100% remote (Canadian-based business)</li>
                                            <li>Team size: 4 (mostly engineers), all from North African origins.</li>
                                            <li>Hours: Full-time, fully flexible</li>
                                            <li>Meetings: Minimal, async-first culture</li>
                                        </ul>
                                        
                                        <h3 style="color: #059669; margin: 1.5rem 0 1rem 0;">Our values 🕌</h3>
                                        <ul style="margin: 1rem 0; padding-left: 1.5rem;">
                                            <li>Iḥsān (Excellence) — Ship the best today, refine tomorrow.</li>
                                            <li>Amānah (Trust) — Say it → own it. Deadlines and promises matter.</li>
                                            <li>ʿAdl (Fairness) — Clear expectations, honest feedback.</li>
                                            <li>Shūrā (Consultation) — Ideas win on merit, not job titles.</li>
                                            <li>Talab al-ʿIlm (Learning) — Weekly "show-what-you-learned" posts/meeting.</li>
                                            <li>Raḥma (Compassion) — Default to empathy.</li>
                                            <li>Khilāfah (Stewardship) — Leave code, docs, and the planet better.</li>
                                            <li style="font-style: italic;">(Belief isn't required; these ethics are.)</li>
                                        </ul>
                                        
                                        <h3 style="color: #dc2626; margin: 1.5rem 0 1rem 0;">Perks 🎁</h3>
                                        <ul style="margin: 1rem 0; padding-left: 1.5rem;">
                                            <li>🏖️ Work from anywhere, anytime.</li>
                                            <li>🧩 Rotate across projects — never get stuck working on only 1 project.</li>
                                            <li>🚀 Rapid career growth in a lean team.</li>
                                            <li>📅 Flexible schedule with near-zero meetings.</li>
                                            <li>🤝 No micromanagement. Deliver your work your way as long as deadlines are met.</li>
                                            <li>🗂️ Organized sprints: every Monday you see all your tasks, with almost no mid or end-week surprises.</li>
                                            <li>💬 Feedback is welcomed; you can shape the roadmap.</li>
                                            <li>🏝️ Need a break? Take one. We offer unlimited paid time off — just keep team goals and deadlines on track.</li>
                                            <li>🕌 Respect for faith and culture – schedule is flex for prayer, fasting, or family events.</li>
                                        </ul>
                                        
                                        <h3 style="color: #059669; margin: 1.5rem 0 1rem 0;">Starting compensation and bonuses 🎁</h3>
                                        <p>Base: TND 2000 – 4500 (Heavily based on experience and past success in software)</p>
                                        
                                        <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e5e7eb;">
                                        
                                        <h3 style="color: #7c3aed; margin: 1.5rem 0 1rem 0;">Interview flow 🛣️</h3>
                                        <ol style="margin: 1rem 0; padding-left: 1.5rem;">
                                            <li>Intro call</li>
                                            <li>Get assigned a paid task on an open-source project (either Caramel or UpUp) as a technical challenge.</li>
                                            <li>Paid trial (2 weeks / 80 hrs) — we both test the fit.</li>
                                            <li>Full-time offer — if the vibes and results match.</li>
                                        </ol>
                                        
                                        <p style="margin: 1.5rem 0;"><strong>Ready to build awesome software with proper principles without the corporate baggage?</strong></p>
                                        <p style="margin: 1rem 0;">Send a frog emoji in the last question if you read through the entire description.</p>
                                        <p style="margin: 1rem 0; font-style: italic;">PS. The questionnaire below are long. Yes. It is annoying, I get it. But it is designed this way to keep the calls and interview process as short as possible for the both of us. Be as honest as possible when filling these in. Looking forward to connect with you!</p>
                                    </div>
                                `
                            } as RichContent,
                            required: false,
                            order: 0
                        },
                        {
                            fieldKey: 'referral_bonus_display',
                            fieldType: QuestionType.DISPLAY,
                            label: '',
                            description: {
                                type: 'html',
                                content: `
                                    <div style="background: linear-gradient(135deg, #fef3c7, #fde68a); padding: 1.5rem; border-radius: 12px; margin: 1rem 0; border-left: 4px solid #f59e0b;">
                                        <h3 style="color: #92400e; margin: 0 0 1rem 0; font-size: 1.25rem;">💸 WIN A 1000 TND BONUS FOR A SUCCESSFUL REFERRAL!! 💸</h3>
                                        <p style="margin: 0.5rem 0; color: #78350f;">We are also looking for:</p>
                                        <ul style="margin: 1rem 0; padding-left: 1.5rem; color: #78350f;">
                                            <li>An AI Data Engineers With DevOps Capabilities - <a href="https://devino.ca/careers/ai-data-engineer" style="color: #92400e;">https://devino.ca/careers/ai-data-engineer</a></li>
                                            <li>Full-Stack Engineers w/ UI/UX Design Skills - <a href="https://devino.ca/careers/full-stack" style="color: #92400e;">https://devino.ca/careers/full-stack</a></li>
                                            <li>A Growth Marketer With SAAS Experience - <a href="https://devino.ca/careers/growth-marketer" style="color: #92400e;">https://devino.ca/careers/growth-marketer</a></li>
                                        </ul>
                                        <p style="margin: 1rem 0; color: #78350f;">If you know anybody who fits these roles forward them the form and write the referral below. If we hire him and he is great fit to our team, you win 1000 TND.</p>
                                        <p style="margin: 0.5rem 0; color: #78350f;">You can also apply to these other positions if you believe you'd be a great fit for them.</p>
                                    </div>
                                `
                            } as RichContent,
                            required: false,
                            order: 1
                        },
                        {
                            fieldKey: 'referral_names',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'Enter the full name of the people you referred including their contact information. (Optional)',
                            required: false,
                            order: 2
                        },
                        {
                            fieldKey: 'referral_linkedin_display',
                            fieldType: QuestionType.DISPLAY,
                            label: '',
                            description: {
                                type: 'html',
                                content: `
                                    <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                                        <p style="margin: 0.5rem 0; font-weight: 600;">Another way to submit a referral is by sending me a message through LinkedIn.</p>
                                        <p style="margin: 0.5rem 0;">Make sure that the referred candidate has submitted his/her application before messaging me. Make sure to tell me which job he/she applied for.</p>
                                        <p style="margin: 0.5rem 0;">My Linkedin: <a href="https://www.linkedin.com/in/amin-dhouib/" target="_blank" style="color: #0ea5e9;">https://www.linkedin.com/in/amin-dhouib/</a></p>
                                        <p style="margin: 0.5rem 0;">My Instagram: <a href="https://www.instagram.com/amin.dhou/" target="_blank" style="color: #ec4899;">https://www.instagram.com/amin.dhou/</a></p>
                                    </div>
                                `
                            } as RichContent,
                            required: false,
                            order: 3
                        }
                    ]
                },
                {
                    title: 'Contact and Basic Info (Section 1 of 3)',
                    description: '',
                    order: 1,
                    questions: [
                        {
                            fieldKey: 'full_name',
                            fieldType: QuestionType.TEXT,
                            label: 'Full Name 📝',
                            required: true,
                            order: 0
                        },
                        {
                            fieldKey: 'country',
                            fieldType: QuestionType.TEXT,
                            label: 'Country of Residence 🌍',
                            required: true,
                            order: 1
                        },
                        {
                            fieldKey: 'resume',
                            fieldType: QuestionType.FILE,
                            label: 'Upload Resume / CV 📄',
                            required: true,
                            validation: {
                                fileTypes: ['.pdf', '.doc', '.docx'],
                                maxFileSize: 10
                            },
                            order: 2
                        },
                        {
                            fieldKey: 'contact_methods_display',
                            fieldType: QuestionType.DISPLAY,
                            label: '',
                            description: {
                                type: 'html',
                                content: `
                                    <div style="background: #eff6ff; padding: 1rem; border-radius: 8px; margin: 1rem 0; border-left: 4px solid #3b82f6;">
                                        <p style="margin: 0; color: #1e40af; font-weight: 500;">Provide 2 or more methods of contacting you 📞</p>
                                        <p style="margin: 0.5rem 0 0 0; color: #1e40af; font-size: 0.9rem;">The more options, the better, as it will make it easier for me to reach back to you for the next steps.</p>
                                    </div>
                                `
                            } as RichContent,
                            required: false,
                            order: 3
                        },
                        {
                            fieldKey: 'contact_linkedin',
                            fieldType: QuestionType.TEXT,
                            label: 'Contact Info (LinkedIn) 💼 [Preferred]',
                            required: false,
                            order: 4
                        },
                        {
                            fieldKey: 'contact_whatsapp',
                            fieldType: QuestionType.TEXT,
                            label: 'Contact Info (WhatsApp) 📱',
                            required: false,
                            order: 5
                        },
                        {
                            fieldKey: 'contact_email',
                            fieldType: QuestionType.EMAIL,
                            label: 'Contact Info (Email Address) 📧',
                            required: false,
                            order: 6
                        },
                        {
                            fieldKey: 'employment_status',
                            fieldType: QuestionType.RADIO,
                            label: 'Employment Status 💼',
                            options: [
                                'No current job, seeking full-time 🚀',
                                'Have a job, open to new roles 🔄'
                            ],
                            required: true,
                            order: 7
                        }
                    ]
                },
                {
                    title: 'Skillset (Section 2 of 3)',
                    description: 'Rate 1‑10 for each skill.',
                    order: 2,
                    questions: [
                        {
                            fieldKey: 'skill_python',
                            fieldType: QuestionType.SCALE,
                            label: 'Python 🐍',
                            required: true,
                            validation: {
                                min: 1,
                                max: 10
                            },
                            order: 0
                        },
                        {
                            fieldKey: 'skill_javascript',
                            fieldType: QuestionType.SCALE,
                            label: 'JavaScript / TypeScript 🟨',
                            required: true,
                            validation: {
                                min: 1,
                                max: 10
                            },
                            order: 1
                        },
                        {
                            fieldKey: 'skill_devops',
                            fieldType: QuestionType.SCALE,
                            label: 'DevOps ⚙️',
                            required: true,
                            validation: {
                                min: 1,
                                max: 10
                            },
                            order: 2
                        },
                        {
                            fieldKey: 'skill_ml',
                            fieldType: QuestionType.SCALE,
                            label: 'Machine Learning 🤖',
                            required: true,
                            validation: {
                                min: 1,
                                max: 10
                            },
                            order: 3
                        }
                    ]
                },
                {
                    title: 'Final Questions (Section 3 of 3)',
                    description: 'Let me get to know you well!',
                    order: 3,
                    questions: [
                        {
                            fieldKey: 'comfortable_tech_stack',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'Most comfortable programming languages / tech stacks? 🚀',
                            required: true,
                            order: 0
                        },
                        {
                            fieldKey: 'best_work',
                            fieldType: QuestionType.TEXTAREA,
                            label: 'Please highlight your very best work here or your biggest accomplishment! 🏅',
                            required: true,
                            order: 1
                        },
                        {
                            fieldKey: 'expected_salary',
                            fieldType: QuestionType.RADIO,
                            label: 'Expected Monthly Base Salary 💰',
                            options: [
                                '1500-2000 TND',
                                '2000-2500 TND',
                                '3000-3500 TND',
                                '3500-4000 TND',
                                '4000-4500 TND'
                            ],
                            required: true,
                            order: 2
                        },
                        {
                            fieldKey: 'frog_emoji_test',
                            fieldType: QuestionType.TEXT,
                            label: 'Send a frog emoji 🐸 if you read everything',
                            required: false,
                            order: 3
                        }
                    ]
                }
            ]
        }
    }
];

export function getJobById(id: string): JobWithForm | undefined {
    return jobs.find(j => j.id === id);
}
