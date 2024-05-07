"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

type Plan = {
    active: boolean;
    popular: boolean;
    price: string;
    unit: string;
    title: string;
    description: string;
    deal1?: string;
    deal2?: string;
    services: string[];
};

const plans: Plan[] = [
    {
        active:true,
        popular:false,
        price: "$3000",
        unit: "mon",
        title: "Part-time",
        deal1: "Save 200$",
        deal2: "5% Off!",
        description:
            "80 hours / Month",
        services: [
            "Part-time Developer",
            "Tech-Lead Guidance",
            "Team Assistance",
            "Three days free trial",
        ],
    },
    {
        active:true,
        popular:true,
        price: "$5800",
        unit: "mon",
        deal1: "Save 600$",
        deal2: "10% Off!",
        title: "Full-time",
        description: "160 hours / Month",
        services: [
            "Full-time Dedicated Developer",
            "Tech-Lead Guidance",
            "Team Assistance",
            "Follow-up",
            "Three days free trial",
        ],
    },
    {
        active:true,
        popular:false,
        price: "$40",
        unit: "hr",
        title: "Custom",
        description: "Hourly services",
        services: [
            "Dedicated Developer",
            "Tech-Lead Guidance",
            "Three days free trial",
        ],
    },
]

export default function Pricing() {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.15, once: true });

    return (
        <motion.section
            ref={ref}
            className="w-full flex justify-center max-w-[min(75rem,96svw)] mx-auto lg:mt-0 "
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
        >
            <motion.div className="w-full grid grid-cols-3 lg:grid-cols-2 gap-8 sm:grid-cols-1">
                {plans.map((plan, key) => (
                    <   PriceCard
                        key={key}
                        plan={plan}
                        className={key === plans.length -  2 ? "lg:order-first lg:w-full" : ''}
                    />
                ))}
            </motion.div>
        </motion.section>
    );
}

const PriceCard = ({
                       plan,
                       className,
                   }: {
    plan: Plan;
    className?: string;
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.5, once: true });

    return (
        <>
            <motion.div className={`${className} w-full flex justify-center`}>
            <motion.div
                ref={ref}
                initial={{opacity: 0, y: 20}}
                animate={{opacity: isInView ? 1 : 0, y: isInView ? 0 : 20}}
                transition={{duration: 0.6, ease: "easeInOut"}}
                className={`rounded-[26px] ${plan.popular ? 'bg-lightbg text-white shadow-2xl shadow-black' : 'text-lightbg sm:border-2 border-lightbg'} flex flex-col px-[30px] py-[10px] h-[500px] w-[292px]`}
            >
                    <motion.div className="flex w-full h-[70px] my-[20px] justify-end">

                        {plan.popular &&
                        <motion.div
                            className="bg-white font-bold rounded-[13px] py-[6px] text-[10px] px-[16px] text-lightbluedark uppercase">
                            Most popular
                        </motion.div>
                        }
                    </motion.div>
                <motion.div className="justify-start content-start flex flex-col">
                    <motion.div className="flex">
                        <motion.div className="text-[32px] font-bold text-start">
                            {plan.price}
                        </motion.div>
                        <motion.div className="text-[17px] text-start mt-auto mb-2">/{plan.unit}</motion.div>
                    </motion.div>
                    <motion.div className="h-[25px] flex">
                    {plan.deal1 && plan.deal2 &&
                        <motion.div className="text-[17px] my-auto text-start">
                            {plan.deal1} <span className="font-bold ml-2">{plan.deal2}</span>
                        </motion.div>
                    }
                    </motion.div>
                    <motion.div className="uppercase text-[28px] text-start font-bold">
                        {plan.title}
                    </motion.div>
                    <motion.div className="text-[17px] text-start my-[10px]">
                        {plan.description}
                    </motion.div>
                    <motion.div className="flex w-full justify-start content-start my-[10px] flex-col gap-3">
                        {plan.services.map((service, key) => (
                            <motion.div key={key} className="flex w-full justify-start content-start">
                                <motion.div>
                                    <Image width={20} height={20} src={ plan.popular ? "/check-circle-1.svg" : "/check-circle-2.svg"} alt="check"/>
                                </motion.div>
                                <motion.div className="text-[13px] ml-[10px] text-start">{service}</motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
                <motion.div className="flex w-full h-full justify-center py-[10px] content-center">

                    <motion.button
                        disabled={!plan.active}
                        className={`rounded-[24px] hover:opacity-80 disabled:opacity-60 mt-auto py-[10px] w-full px-[30px] text-[17px] font-bold uppercase ${plan.popular ? 'text-lightbluedark  bg-white' : 'text-white bg-lightbg'}`}
                    >
                        <Link
                            target="_blank"
                            href="https://calendly.com/amin-dhouib">
                        Schedule a call
                        </Link>
                    </motion.button>
                </motion.div>
            </motion.div>
            </motion.div>
        </>
    );
};
