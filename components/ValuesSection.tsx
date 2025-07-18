"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MdExplore, MdFavorite, MdBalance, MdGroups, MdStar, MdSecurity } from "react-icons/md";

type Value = {
    title: string;
    description: string;
    principle: string;
    icon: any;
};

const values: Value[] = [
    {
        title: "Integrity & Honesty",
        description: "We conduct business with complete transparency and truthfulness in all our dealings.",
        principle: "Trustworthiness",
        icon: MdSecurity
    },
    {
        title: "Excellence & Quality",
        description: "We strive for perfection in everything we do, delivering work that we&apos;re proud of.",
        principle: "Excellence",
        icon: MdStar
    },
    {
        title: "Justice & Fairness",
        description: "Equal opportunities, fair compensation, and respectful treatment for all team members.",
        principle: "Justice",
        icon: MdBalance
    },
    {
        title: "Compassion & Care",
        description: "We genuinely care about each other&apos;s wellbeing and support one another through challenges.",
        principle: "Compassion",
        icon: MdFavorite
    },
    {
        title: "Unity & Brotherhood",
        description: "We work as one family, celebrating successes together and supporting each other.",
        principle: "Brotherhood",
        icon: MdGroups
    },
    {
        title: "Guidance & Wisdom",
        description: "We seek knowledge, make thoughtful decisions, and guide each other toward success.",
        principle: "Wisdom",
        icon: MdExplore
    }
];

export default function ValuesSection() {
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
                    <MdStar className="w-4 h-4" />
                    <span>Core Values</span>
                </div>

                <h2 className="text-5xl lg:text-4xl md:text-3xl sm:text-2xl font-bold text-darkblue dark:text-white mb-6">
                    Our Core{" "}
                    <span className="text-lightblueactive">Values</span>
                </h2>

                <p className="text-xl lg:text-lg md:text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    Our work culture is built on fundamental principles that guide how we treat each other,
                    our clients, and approach our daily work. These values create a harmonious and purpose-driven environment.
                </p>
            </motion.div>

            {/* Values Grid */}
            <motion.section
                ref={ref}
                className="w-full mx-auto"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                <motion.div className="grid grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-8 lg:gap-6 md:gap-6 w-full mx-auto">
                    {values.map((value, index) => (
                        <ValueCard
                            key={index}
                            value={value}
                            index={index}
                            isInView={isInView}
                        />
                    ))}
                </motion.div>
            </motion.section>
        </motion.div>
    );
}

const ValueCard = ({
                       value,
                       index,
                       isInView
                   }: {
    value: Value;
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
            <div className="relative w-full h-[300px] md:h-[280px]">
                {/* Front Card */}
                <motion.div
                    className="bg-pastelBlue dark:bg-deepBlue text-darkblue dark:text-white rounded-[32px] transition-colors duration-300 h-full w-full absolute top-0 left-0 p-6 flex items-center justify-center flex-col gap-4 border-0 dark:border-0"
                >
                    <div className="w-[70px] h-[70px] flex items-center justify-center">
                        <value.icon className="w-full h-full text-darkblue dark:text-white" />
                    </div>
                    <motion.h3 className="text-center font-bold text-[20px] text-darkblue dark:text-white">
                        {value.title}
                    </motion.h3>
                    <div className="text-sm font-medium text-darkblue dark:text-lightblueactive opacity-80">
                        {value.principle}
                    </div>
                </motion.div>

                {/* Back Card - Visible on Hover */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="h-full w-full flex justify-center items-center text-center text-[16px] absolute top-0 left-0 p-6 bg-darkblue bg-opacity-90 rounded-[32px] transition-all duration-300 text-white border border-[#f1f8fe] flex-col gap-4 dark:border-0 dark:bg-deepBlue dark:bg-opacity-95"
                >
                    <div className="w-[70px] h-[70px] flex items-center justify-center">
                        <value.icon className="w-full h-full text-white" />
                    </div>
                    <div className="leading-relaxed">
                        {value.description}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};