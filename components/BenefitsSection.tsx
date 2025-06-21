// components/careers/BenefitsSection.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
    MdHome,
    MdSchedule,
    MdTrendingUp,
    MdMenuBook,
    MdSecurity,
    MdFavorite,
    MdLaptop,
    MdLocalCafe,
    MdFlight,
    MdAttachMoney,
    MdPeople,
    MdDateRange
} from "react-icons/md";
import AwsmButton from "~/app/_ui/AwsmButton";
import Link from "next/link";

type Benefit = {
    title: string;
    description: string;
    icon: any;
};

const benefits: Benefit[] = [
    {
        title: "Remote Work",
        description: "Work from anywhere with complete flexibility and freedom.",
        icon: MdHome
    },
    {
        title: "Flexible Hours",
        description: "Choose your schedule that works best for your lifestyle.",
        icon: MdSchedule
    },
    {
        title: "Career Growth",
        description: "Fast-track promotions and skill development opportunities.",
        icon: MdTrendingUp
    },
    {
        title: "Learning Budget",
        description: "Annual budget for courses, conferences, and certifications.",
        icon: MdMenuBook
    },
    {
        title: "Health Coverage",
        description: "Comprehensive health insurance and wellness programs.",
        icon: MdSecurity
    },
    {
        title: "Mental Health",
        description: "Access to mental health resources and counseling services.",
        icon: MdFavorite
    },
    {
        title: "Equipment Setup",
        description: "Get the best tools including laptop and workspace setup.",
        icon: MdLaptop
    },
    {
        title: "Wellness Perks",
        description: "Monthly allowance for coffee, snacks, and activities.",
        icon: MdLocalCafe
    },
    {
        title: "Team Retreats",
        description: "Annual company-paid retreats for team bonding.",
        icon: MdFlight
    },
    {
        title: "Competitive Pay",
        description: "Market-leading compensation with performance bonuses.",
        icon: MdAttachMoney
    },
    {
        title: "Team Building",
        description: "Regular activities to build strong relationships.",
        icon: MdPeople
    },
    {
        title: "Unlimited PTO",
        description: "Take the time you need to recharge and refresh.",
        icon: MdDateRange
    }
];

export default function BenefitsSection() {
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
                    <MdFavorite className="w-4 h-4" />
                    <span>Team Benefits</span>
                </div>

                <h2 className="text-5xl lg:text-4xl md:text-3xl sm:text-2xl font-bold text-darkblue dark:text-white mb-6">
                    Exceptional{" "}
                    <span className="text-lightblueactive">Benefits</span>
                </h2>

                <p className="text-xl lg:text-lg md:text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    We believe in taking care of our team members with comprehensive benefits
                    that support your professional growth and personal wellbeing.
                </p>
            </motion.div>

            {/* Benefits Grid */}
            <motion.section
                ref={ref}
                className="w-full mx-auto mb-16 lg:mb-12 md:mb-10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                <motion.div className="grid grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-8 lg:gap-6 md:gap-6 w-full mx-auto">
                    {benefits.map((benefit, index) => (
                        <BenefitCard
                            key={index}
                            benefit={benefit}
                            index={index}
                            isInView={isInView}
                        />
                    ))}
                </motion.div>
            </motion.section>

            {/* CTA Banner */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="w-full"
            >
                <div className="bg-pastelBlue dark:bg-deepBlue rounded-[32px] p-8 lg:p-6 md:p-6 text-center">
                    <h3 className="text-3xl lg:text-2xl md:text-xl font-bold text-darkblue dark:text-white mb-4">
                        Ready to Join Our Team?
                    </h3>
                    <p className="text-lg lg:text-base md:text-sm text-darkblue dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                        Experience these benefits and more as part of the Devino family.
                        Start your journey with a team that values your growth and wellbeing.
                    </p>
                    <AwsmButton>
                        <Link href={"/careers#open-positions"} className="flex items-center gap-2">
                            View Open Positions
                        </Link>
                    </AwsmButton>
                </div>
            </motion.div>
        </motion.div>
    );
}

const BenefitCard = ({
                         benefit,
                         index,
                         isInView
                     }: {
    benefit: Benefit;
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
            <div className="relative w-full h-[280px] lg:h-[260px] md:h-[240px]">
                {/* Front Card */}
                <motion.div
                    className="bg-pastelBlue dark:bg-deepBlue text-darkblue dark:text-white rounded-[32px] transition-colors duration-300 h-full w-full absolute top-0 left-0 p-6 flex items-center justify-center flex-col gap-4 border-0 dark:border-0"
                >
                    <div className="w-[60px] h-[60px] flex items-center justify-center">
                        <benefit.icon className="w-full h-full text-darkblue dark:text-white" />
                    </div>
                    <motion.h4 className="text-center font-bold text-[18px] lg:text-[16px] text-darkblue dark:text-white">
                        {benefit.title}
                    </motion.h4>
                </motion.div>

                {/* Back Card - Visible on Hover */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="h-full w-full flex justify-center items-center text-center text-[14px] absolute top-0 left-0 p-6 bg-darkblue bg-opacity-90 rounded-[32px] transition-all duration-300 text-white border border-[#f1f8fe] flex-col gap-4 dark:border-0 dark:bg-deepBlue dark:bg-opacity-95"
                >
                    <div className="w-[60px] h-[60px] flex items-center justify-center">
                        <benefit.icon className="w-full h-full text-white" />
                    </div>
                    <h4 className="font-bold text-[18px] text-white mb-2">
                        {benefit.title}
                    </h4>
                    <div className="leading-relaxed text-white/90">
                        {benefit.description}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};