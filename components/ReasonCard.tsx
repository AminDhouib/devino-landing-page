"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MdFavorite, MdFlashOn, MdPublic, MdEmojiEvents, MdGroups, MdGpsFixed } from "react-icons/md";
import Image from "next/image";

type Reason = {
    title: string;
    description: string;
    icon: any;
};

const reasons: Reason[] = [
    {
        title: "Purpose-Driven Work",
        description: "Every project has meaning. We build solutions that make a real difference in people's lives and businesses.",
        icon: MdFavorite
    },
    {
        title: "Innovation at Core",
        description: "Work with cutting-edge technologies and methodologies. We're always exploring the next big thing.",
        icon: MdFlashOn
    },
    {
        title: "Global Impact",
        description: "Your work reaches clients across 15+ industries worldwide. Make an impact on a global scale.",
        icon: MdPublic
    },
    {
        title: "Excellence Recognition",
        description: "95% on-time delivery rate and 98% client satisfaction. Be part of an award-winning team.",
        icon: MdEmojiEvents
    },
    {
        title: "Collaborative Culture",
        description: "Work with passionate professionals who support each other's growth and success.",
        icon: MdGroups
    },
    {
        title: "Clear Vision",
        description: "Our mission is clear: Anticipate tomorrow's challenges and innovate beyond boundaries.",
        icon: MdGpsFixed
    }
];

export default function WhyDevinoSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.15, once: true });

    return (
        <motion.div className="mt-[12rem] md:mt-[5rem] max-w-[min(75rem,96svw)] md:max-w-[100%] md:px-6 w-full flex flex-col mx-auto">
            {/* Mobile/Tablet Header - Only visible on lg and down */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16 lg:mb-12 md:mb-10 hidden lg:block"
            >
                <div className="inline-flex items-center space-x-3 bg-lightblueactive/10 text-lightblueactive px-6 py-2 rounded-full text-sm font-medium mb-6">
                    <MdFavorite className="w-4 h-4" />
                    <span>Why Choose Us</span>
                </div>

                <h2 className="text-3xl md:text-2xl font-bold text-darkblue dark:text-white mb-6">
                    Why Choose{" "}
                    <span className="text-lightblueactive">Devino</span>?
                </h2>

                <p className="text-base md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    We&apos;re not just another software company. We&apos;re a community of innovators,
                    problem-solvers, and dreamers building something extraordinary.
                </p>
            </motion.div>

            {/* Desktop Sticky Layout - xl and up */}
            <div className="grid grid-cols-2 gap-12 min-h-screen items-start lg:block">
                {/* Left Side - Sticky Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -30 }}
                    transition={{ duration: 0.8 }}
                    className="sticky top-24 h-fit lg:hidden"
                >
                    <div className="pr-8">
                        <div className="inline-flex items-center space-x-3 bg-lightblueactive/10 text-lightblueactive px-6 py-2 rounded-full text-sm font-medium mb-6">
                            <MdFavorite className="w-4 h-4" />
                            <span>Why Choose Us</span>
                        </div>

                        <h2 className="text-5xl font-bold text-darkblue dark:text-white mb-6">
                            Why Choose{" "}
                            <span className="text-lightblueactive">Devino</span>?
                        </h2>

                        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                            We&apos;re not just another software company. We&apos;re a community of innovators,
                            problem-solvers, and dreamers who believe in building something extraordinary together.
                        </p>

                        {/* Illustration Placeholder */}
                        <Image src="/why-section.png" alt="Illustration" width={1000} height={1000} className="w-120 h-auto" />

                    </div>
                </motion.div>

                {/* Right Side - Scrollable Cards */}
                <motion.section
                    ref={ref}
                    className="w-full"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                    <motion.div className="grid grid-cols-1 gap-8 lg:gap-6 md:gap-6 w-full">
                        {reasons.map((reason, index) => (
                            <ReasonCard
                                key={index}
                                reason={reason}
                                index={index}
                                isInView={isInView}
                            />
                        ))}
                    </motion.div>
                </motion.section>
            </div>
        </motion.div>
    );
}

const ReasonCard = ({
                        reason,
                        index,
                        isInView
                    }: {
    reason: Reason;
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
            <div className="relative w-full h-[280px] lg:h-[240px] md:h-[260px]">
                {/* Front Card */}
                <motion.div
                    className="bg-pastelBlue dark:bg-deepBlue text-darkblue dark:text-white rounded-[32px] transition-colors duration-300 h-full w-full absolute top-0 left-0 p-6 flex items-start justify-center flex-col gap-4 border-0 dark:border-0"
                >
                    <div className="w-[60px] h-[60px] flex items-center justify-center">
                        <reason.icon className="w-full h-full text-darkblue dark:text-white" />
                    </div>
                    <motion.h3 className="font-bold text-[18px] lg:text-[16px] text-darkblue dark:text-white">
                        {reason.title}
                    </motion.h3>
                    <p className="text-sm text-darkblue dark:text-gray-300 leading-relaxed">
                        {reason.description}
                    </p>
                </motion.div>

                {/* Back Card - Visible on Hover */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="h-full w-full flex justify-start items-start text-left text-[14px] absolute top-0 left-0 p-6 bg-darkblue bg-opacity-90 rounded-[32px] transition-all duration-300 text-white border border-[#f1f8fe] flex-col gap-4 dark:border-0 dark:bg-deepBlue dark:bg-opacity-95"
                >
                    <div className="w-[60px] h-[60px] flex items-center justify-center">
                        <reason.icon className="w-full h-full text-white" />
                    </div>
                    <h3 className="font-bold text-[18px] text-white">
                        {reason.title}
                    </h3>
                    <p className="leading-relaxed text-white/90">
                        {reason.description}
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};