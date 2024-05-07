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
        description: "Cutting edge-soltuions that drive success",
        icon: "/Light.svg"
    },
    {
        title: "Client-Centric Collaboration",
        description: "We work hand-in-hand, Your vision is our mission",
        icon: "/collaboration.svg"
    },
    {
        title: "Dedication to Excellence",
        description: "Committed to excellence in every project we undertake",
        icon: "/Star.svg"
    },
    {
        title: "Flexibility and Transparency",
        description: "Flexible team structure and transparent pricing model",
        icon: "/Loop.svg"
    },
]

export default function Methodologies() {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.15, once: true });

    return (
        <motion.section
            ref={ref}
            className="w-full mt-[12rem] sm:mt-[5rem] grid grid-cols-4 lg:grid-cols-2 sm:flex sm:flex-col sm:justify-center lg:px-2 md:mx-4 items-center justify-center text-center max-w-[min(75rem,96svw)] mx-auto gap-8 "
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
            <motion.div className="flex py-5 sm:ml-auto sm:mr-auto bg-opacity-25 flex-col gap-5 rounded-[32px] bg-cream w-[241px] h-[241px]">
                <motion.div className="w-full flex justify-center">
                    <Image alt={methodology.icon} src={methodology.icon} height={"50"} width={"50"} className="m-auto"/>
                </motion.div>
                <motion.div className="w-full flex justify-center text-center font-bold text-[20px]">
                    {methodology.title}
                </motion.div>
                <motion.div className="w-full flex justify-center text-center text-[16px]">
                    {methodology.description}
                </motion.div>
            </motion.div>
        </>
    );
};
