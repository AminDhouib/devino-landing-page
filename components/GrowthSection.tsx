// components/careers/GrowthSection.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
    MdTrendingUp,
    MdCode,
    MdPalette,
    MdStorage,
    MdPhoneAndroid,
    MdLanguage,
    MdRocket,
    MdTrackChanges,
    MdPeople,
    MdEmojiEvents,
    MdMenuBook,
    MdArrowForward
} from "react-icons/md";

type GrowthPath = {
    title: string;
    description: string;
    skills: string[];
    icon: any;
};

type Project = {
    title: string;
    description: string;
    tech: string[];
    industry: string;
};

const growthPaths: GrowthPath[] = [
    {
        title: "Full-Stack Development",
        description: "Master both frontend and backend technologies across multiple frameworks",
        skills: ["React/Next.js", "Node.js", "TypeScript", "Database Design", "API Development"],
        icon: MdCode
    },
    {
        title: "UI/UX Design",
        description: "Create beautiful, user-centered designs that solve real problems",
        skills: ["Figma", "Design Systems", "User Research", "Prototyping", "Accessibility"],
        icon: MdPalette
    },
    {
        title: "DevOps & Cloud",
        description: "Build scalable infrastructure and streamline deployment processes",
        skills: ["AWS/Azure", "Docker", "CI/CD", "Kubernetes", "Infrastructure as Code"],
        icon: MdStorage
    },
    {
        title: "Mobile Development",
        description: "Create native and cross-platform mobile applications",
        skills: ["React Native", "Flutter", "iOS/Android", "App Store Optimization", "Performance"],
        icon: MdPhoneAndroid
    },
    {
        title: "Project Leadership",
        description: "Lead teams and projects while maintaining technical excellence",
        skills: ["Team Management", "Agile/Scrum", "Client Relations", "Architecture", "Mentoring"],
        icon: MdPeople
    },
    {
        title: "Technical Consulting",
        description: "Become a trusted advisor helping clients solve complex challenges",
        skills: ["Solution Architecture", "Technical Writing", "Presentation", "Strategy", "Innovation"],
        icon: MdTrackChanges
    }
];

const projectTypes: Project[] = [
    {
        title: "E-commerce Platforms",
        description: "Build scalable online stores with complex inventory and payment systems",
        tech: ["Next.js", "Stripe", "PostgreSQL", "Redis"],
        industry: "Retail"
    },
    {
        title: "FinTech Applications",
        description: "Develop secure financial applications with real-time data processing",
        tech: ["React", "Node.js", "MongoDB", "WebSockets"],
        industry: "Finance"
    },
    {
        title: "Healthcare Systems",
        description: "Create HIPAA-compliant systems for patient management and telemedicine",
        tech: ["Vue.js", "Python", "PostgreSQL", "AWS"],
        industry: "Healthcare"
    },
    {
        title: "Educational Platforms",
        description: "Build interactive learning management systems and online courses",
        tech: ["React", "Express", "MySQL", "WebRTC"],
        industry: "Education"
    }
];

export default function GrowthSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.15, once: true });

    return (
        <motion.div className="mt-[12rem] md:mt-[5rem] max-w-[min(75rem,96svw)] md:max-w-[100%] md:px-6 w-full flex flex-col mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16 lg:mb-12 md:mb-10"
            >
                <div className="inline-flex items-center space-x-3 bg-lightblueactive/10 text-lightblueactive px-6 py-2 rounded-full text-sm font-medium mb-6">
                    <MdTrendingUp className="w-4 h-4" />
                    <span>Career Growth</span>
                </div>

                <h2 className="text-5xl lg:text-4xl md:text-3xl sm:text-2xl font-bold text-darkblue dark:text-white mb-6">
                    Accelerate Your{" "}
                    <span className="text-lightblueactive">Career</span>
                </h2>

                <p className="text-xl lg:text-lg md:text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    We believe in rapid growth through diverse projects, mentorship, and continuous learning.
                    Choose your path and we&apos;ll help you get there faster than anywhere else.
                </p>
            </motion.div>

            {/* Growth Statistics */}
            <motion.section
                ref={ref}
                className="w-full mx-auto mb-16 lg:mb-12 md:mb-10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                <motion.div className="grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-8 lg:gap-6 md:gap-6 w-full mx-auto">
                    {[
                        { icon: MdRocket, value: "6 months", label: "Avg. Promotion Time" },
                        { icon: MdMenuBook, value: "15+", label: "Industries Covered" },
                        { icon: MdLanguage, value: "300+", label: "Projects to Learn From" },
                        { icon: MdEmojiEvents, value: "100%", label: "Mentorship Program" }
                    ].map((stat, index) => (
                        <StatCard key={index} stat={stat} index={index} isInView={isInView} />
                    ))}
                </motion.div>
            </motion.section>

            {/* Growth Paths */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-16 lg:mb-12 md:mb-10"
            >
                <h3 className="text-4xl lg:text-3xl md:text-2xl sm:text-xl font-bold text-darkblue dark:text-white text-center mb-12 lg:mb-10 md:mb-8">
                    Choose Your Growth Path
                </h3>

                <div className="grid grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-8 lg:gap-6 md:gap-6">
                    {growthPaths.map((path, index) => (
                        <GrowthPathCard
                            key={index}
                            path={path}
                            index={index}
                            isInView={isInView}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Project Diversity */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <h3 className="text-4xl lg:text-3xl md:text-2xl sm:text-xl font-bold text-darkblue dark:text-white text-center mb-12 lg:mb-10 md:mb-8">
                    Diverse Project Experience
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-1 gap-8 lg:gap-6 md:gap-6">
                    {projectTypes.map((project, index) => (
                        <ProjectCard
                            key={index}
                            project={project}
                            index={index}
                            isInView={isInView}
                        />
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}

const StatCard = ({
                      stat,
                      index,
                      isInView
                  }: {
    stat: { icon: any; value: string; label: string };
    index: number;
    isInView: boolean;
}) => {
    const cardRef = useRef(null);
    const cardInView = useInView(cardRef, { amount: 0.15, once: false });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{
                opacity: isInView && cardInView ? 1 : 0,
                y: isInView && cardInView ? 0 : 30
            }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut"
            }}
            className="group cursor-pointer"
        >
            <div className="relative w-full h-[200px] lg:h-[180px] md:h-[160px]">
                {/* Front Card */}
                <motion.div
                    className="bg-pastelBlue dark:bg-deepBlue text-darkblue dark:text-white rounded-[32px] transition-colors duration-300 h-full w-full absolute top-0 left-0 p-6 flex items-center justify-center flex-col gap-4 border-0 dark:border-0"
                >
                    <div className="w-[50px] h-[50px] flex items-center justify-center">
                        <stat.icon className="w-full h-full text-darkblue dark:text-white" />
                    </div>
                    <div className="text-3xl lg:text-2xl md:text-xl font-bold text-darkblue dark:text-white">
                        {stat.value}
                    </div>
                    <div className="text-center text-sm text-darkblue dark:text-gray-300 font-medium">
                        {stat.label}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

const GrowthPathCard = ({
                            path,
                            index,
                            isInView
                        }: {
    path: GrowthPath;
    index: number;
    isInView: boolean;
}) => {
    const cardRef = useRef(null);
    const cardInView = useInView(cardRef, { amount: 0.15, once: false });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{
                opacity: isInView && cardInView ? 1 : 0,
                y: isInView && cardInView ? 0 : 30
            }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut"
            }}
            className="group cursor-pointer"
        >
            <div className="relative w-full h-[380px] lg:h-[360px] md:h-[340px]">
                {/* Front Card */}
                <motion.div
                    className="bg-pastelBlue dark:bg-deepBlue text-darkblue dark:text-white rounded-[32px] transition-colors duration-300 h-full w-full absolute top-0 left-0 p-6 flex items-start justify-center flex-col gap-4 border-0 dark:border-0"
                >
                    <div className="w-[60px] h-[60px] flex items-center justify-center">
                        <path.icon className="w-full h-full text-darkblue dark:text-white" />
                    </div>
                    <motion.h4 className="text-center font-bold text-[18px] lg:text-[16px] text-darkblue dark:text-white w-full">
                        {path.title}
                    </motion.h4>
                    <p className="text-sm text-darkblue dark:text-gray-300 leading-relaxed text-center">
                        {path.description}
                    </p>
                    <div className="w-full">
                        <div className="text-xs font-medium text-lightblueactive dark:text-lightblueactive uppercase tracking-wide mb-2">
                            Key Skills
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {path.skills.slice(0, 3).map((skill, skillIndex) => (
                                <span
                                    key={skillIndex}
                                    className="px-2 py-1 bg-darkblue/10 dark:bg-lightblueactive/20 text-darkblue dark:text-lightblueactive rounded text-xs"
                                >
                                    {skill}
                                </span>
                            ))}
                            {path.skills.length > 3 && (
                                <span className="px-2 py-1 bg-darkblue/10 dark:bg-lightblueactive/20 text-darkblue dark:text-lightblueactive rounded text-xs">
                                    +{path.skills.length - 3} more
                                </span>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Back Card - Visible on Hover */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="h-full w-full flex justify-start items-start text-left text-[14px] absolute top-0 left-0 p-6 bg-darkblue bg-opacity-90 rounded-[32px] transition-all duration-300 text-white border border-[#f1f8fe] flex-col gap-4 dark:border-0 dark:bg-deepBlue dark:bg-opacity-95"
                >
                    <div className="w-[60px] h-[60px] flex items-center justify-center">
                        <path.icon className="w-full h-full text-white" />
                    </div>
                    <h4 className="font-bold text-[18px] text-white">
                        {path.title}
                    </h4>
                    <p className="leading-relaxed text-white/90 mb-2">
                        {path.description}
                    </p>
                    <div className="w-full">
                        <div className="text-xs font-medium text-lightblueactive uppercase tracking-wide mb-2">
                            All Skills
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {path.skills.map((skill, skillIndex) => (
                                <span
                                    key={skillIndex}
                                    className="px-2 py-1 bg-white/20 text-white rounded text-xs"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

const ProjectCard = ({
                         project,
                         index,
                         isInView
                     }: {
    project: Project;
    index: number;
    isInView: boolean;
}) => {
    const cardRef = useRef(null);
    const cardInView = useInView(cardRef, { amount: 0.15, once: false });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{
                opacity: isInView && cardInView ? 1 : 0,
                y: isInView && cardInView ? 0 : 30
            }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut"
            }}
            className="group cursor-pointer"
        >
            <div className="relative w-full h-[200px] lg:h-[180px] md:h-[200px]">
                {/* Front Card */}
                <motion.div
                    className="bg-pastelBlue dark:bg-deepBlue text-darkblue dark:text-white rounded-[32px] transition-colors duration-300 h-full w-full absolute top-0 left-0 p-6 flex items-start justify-center flex-col gap-3 border-0 dark:border-0"
                >
                    <div className="flex items-start justify-between w-full">
                        <div className="flex-1">
                            <h4 className="text-[18px] lg:text-[16px] font-bold text-darkblue dark:text-white mb-1">
                                {project.title}
                            </h4>
                            <span className="text-xs font-medium text-lightblueactive bg-lightblueactive/10 px-2 py-1 rounded">
                                {project.industry}
                            </span>
                        </div>
                        <MdArrowForward className="w-5 h-5 text-darkblue dark:text-gray-400 group-hover:text-lightblueactive group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                    <p className="text-sm text-darkblue dark:text-gray-300 leading-relaxed">
                        {project.description}
                    </p>
                </motion.div>

                {/* Back Card - Visible on Hover */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="h-full w-full flex justify-start items-start text-left text-[14px] absolute top-0 left-0 p-6 bg-darkblue bg-opacity-90 rounded-[32px] transition-all duration-300 text-white border border-[#f1f8fe] flex-col gap-4 dark:border-0 dark:bg-deepBlue dark:bg-opacity-95"
                >
                    <div className="flex items-start justify-between w-full">
                        <div className="flex-1">
                            <h4 className="text-[18px] font-bold text-white mb-1">
                                {project.title}
                            </h4>
                            <span className="text-xs font-medium text-lightblueactive bg-lightblueactive/20 px-2 py-1 rounded">
                                {project.industry}
                            </span>
                        </div>
                    </div>
                    <p className="leading-relaxed text-white/90 mb-2">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                            <span
                                key={techIndex}
                                className="px-2 py-1 bg-white/20 text-white rounded text-xs font-medium"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};