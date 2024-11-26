"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

type Methodology = {
    title: string;
    description: string;
    icon: string
};

const methodologies: Methodology[] = [
    {
        title: "Innovation and Creativity",
        description: "Over 200 solutions delivered with the latest tech for real results.",
        icon: "/Light.svg"
    },
    {
        title: "Client-Centric Collaboration",
        description: "100+ clients, 98% satisfaction rate across 15 industries.",
        icon: "/collaboration.svg"
    },
    {
        title: "Commitment to Quality and Excellence",
        description: "95% on-time rate across 300+ projects.",
        icon: "/Star.svg"
    },
    {
        title: "Flexibility and Transparency",
        description: "Flexible scalability, transparent pricing.",
        icon: "/Loop.svg"
    },
]

export default function Methodologies() {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.15, once: true });

    return (
        <motion.section
            ref={ref}
            className="w-full mt-[12rem] sm:mt-[5rem] grid grid-cols-4 lg:grid-cols-2 sm:flex sm:flex-col sm:justify-center lg:px-2 items-center justify-center text-center lg:max-w-auto max-w-[min(75rem,96svw)] mx-auto gap-8 "
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
        >
                {methodologies.map((methodology, key) => (
                    <MethodologyCard
                        key={key}
                        methodology={methodology}
                    />
                ))}
        </motion.section>
    );
}

const MethodologyCard = ({
                        methodology,
                   }: {
    methodology: Methodology;
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.5, once: true });

    return (
        <>
            <motion.div className="flex p-5 sm:ml-auto sm:mr-auto bg-opacity-25 flex-col gap-5 rounded-[32px] dark:bg-darkbgDark bg-cream w-fit h-full xl:w-full">
                <motion.div className="w-full flex justify-center">
                    <Image alt={methodology.icon} src={methodology.icon} height={"50"} width={"50"} className="m-auto"/>
                </motion.div>
                <motion.div className="w-full flex justify-center text-center font-bold text-[20px] dark:text-white">
                    {methodology.title}
                </motion.div>
                <motion.div className="w-full flex justify-center text-center text-[16px] dark:text-gray-400">
                    {methodology.description}
                </motion.div>
            </motion.div>
        </>
    );
};
