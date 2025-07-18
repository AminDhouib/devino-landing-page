// components/careers/CareersHero.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MdArrowForward, MdPeople, MdLocationOn, MdTrendingUp, MdRocket } from "react-icons/md";
import AwsmButton from "~/app/_ui/AwsmButton";
import Image from "next/image";

export default function CareersHero() {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.15, once: true });

    const stats = [
        { icon: MdPeople, value: "50+", label: "Team Members" },
        { icon: MdLocationOn, value: "100%", label: "Remote First" },
        { icon: MdTrendingUp, value: "300+", label: "Projects Delivered" }
    ];

    return (
        <motion.div className="mt-[8rem] md:mt-[5rem] max-w-[min(75rem,96svw)] md:max-w-[100%] md:px-6 w-full flex flex-col mx-auto min-h-[80vh] lg:min-h-[70vh] md:min-h-[60vh]">
            {/* Hero Content */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-12 lg:gap-8 items-center h-full">
                {/* Left Content */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8 lg:space-y-6 md:space-y-5 lg:text-center"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="inline-flex items-center space-x-3 bg-lightblueactive/10 text-lightblueactive px-6 py-2 rounded-full text-sm font-medium lg:mx-auto"
                    >
                        <MdRocket className="w-4 h-4" />
                        <span>We&apos;re Hiring</span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-6xl lg:text-5xl md:text-4xl sm:text-3xl font-bold text-darkblue dark:text-white leading-tight"
                    >
                        Build Your{" "}
                        <span className="relative">
                            <span className="text-lightblueactive">Career</span>
                        </span>{" "}
                        <br className="lg:hidden" />
                        Beyond Boundaries
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl lg:text-lg md:text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl lg:mx-auto"
                    >
                        Join a remote-first team that values innovation, personal growth, and work-life balance.
                        Work on cutting-edge projects with a supportive global community of developers and designers.
                    </motion.p>

                    {/* Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="grid grid-cols-3 gap-8 lg:gap-6 md:gap-4 py-6"
                    >
                        {stats.map((stat, index) => (
                            <StatCard key={index} stat={stat} index={index} isInView={isInView} />
                        ))}
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="lg:flex lg:justify-center"
                    >
                        <AwsmButton className="inline-flex items-center">
                            View Open Positions
                        </AwsmButton>
                    </motion.div>
                </motion.div>

                {/* Right Illustration */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative lg:hidden"
                >
                    {/* Main Illustration Container */}
                    <div className="relative w-full h-[500px] bg-pastelBlue dark:bg-deepBlue rounded-[32px] flex items-center justify-center shadow-lg overflow-hidden">
                        {/* Floating Background Elements */}
                        <motion.div
                            animate={{
                                y: [-20, 20, -20],
                                rotate: [0, 5, 0]
                            }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-8 right-8 w-16 h-16 bg-lightblueactive/20 rounded-full"
                        />

                        <motion.div
                            animate={{
                                y: [20, -20, 20],
                                rotate: [0, -5, 0]
                            }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-8 left-8 w-12 h-12 bg-darkblue/20 rounded-full"
                        />

                        <motion.div
                            animate={{
                                y: [-10, 10, -10],
                                x: [-5, 5, -5]
                            }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-20 left-12 w-8 h-8 bg-lightblueactive/30 rounded-full"
                        />

                        {/* Central Content */}
                        <div className="text-center space-y-6 p-8 z-10">
                            <Image src="/careers-hero.svg" alt="Careers Illustration" width={800} height={800} className="mx-auto" />
                        </div>
                    </div>

                    {/* Floating Action Elements */}
                    <motion.div
                        animate={{
                            y: [-15, 15, -15],
                            rotate: [0, 10, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-4 -right-4 w-20 h-20 bg-lightblueactive rounded-full flex items-center justify-center shadow-lg"
                    >
                        <MdRocket className="w-8 h-8 text-white" />
                    </motion.div>

                    <motion.div
                        animate={{
                            y: [15, -15, 15],
                            rotate: [0, -10, 0]
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -bottom-4 -left-4 w-16 h-16 bg-darkblue rounded-full flex items-center justify-center shadow-lg"
                    >
                        <MdTrendingUp className="w-6 h-6 text-white" />
                    </motion.div>
                </motion.div>
            </div>
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
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 20,
                scale: isInView ? 1 : 0.95
            }}
            transition={{
                duration: 0.6,
                delay: 0.5 + index * 0.1,
                ease: "easeOut"
            }}
            className="text-center group"
        >
            <div className="p-4 lg:p-3 md:p-2 bg-pastelBlue dark:bg-deepBlue rounded-xl hover:shadow-md transition-all duration-300 group-hover:scale-105">
                <div className="flex justify-center mb-2">
                    <stat.icon className="w-6 h-6 lg:w-5 lg:h-5 text-lightblueactive" />
                </div>
                <div className="text-2xl lg:text-xl md:text-lg font-bold text-darkblue dark:text-white">
                    {stat.value}
                </div>
                <div className="text-sm lg:text-xs text-darkblue dark:text-gray-400 font-medium">
                    {stat.label}
                </div>
            </div>
        </motion.div>
    );
};