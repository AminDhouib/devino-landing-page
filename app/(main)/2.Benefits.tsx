"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const benefits = [
  {
    title: "Innovation and Creativity",
    description: "Cutting-edge solutions that drive success.",
  },
  {
    title: "Client-Centric Collaboration",
    description: "We work hand-in-hand, Your vision is our mission",
  },
  {
    title: "Dedication to Excellence",
    description: "Committed to excellence in every project we undertake",
  },
  {
    title: "Flexibility and Transparency",
    description: "Flexible team structure and transparent pricing model",
  },
];

export default function Benefits() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });

  return (
    <section
      ref={ref}
      className="w-full grid sm:px-3 grid-cols-4 lg:grid-cols-2 sm:grid-cols-1 text-center max-w-[min(75rem,96svw)] sm:max-w-[100%] sm:px-6 mx-auto lg:mt-0 mt-8 lg:gap-3 gap-8 h-[19rem]"
    >
      {benefits.map((benefit, i) => (
        <motion.div
          key={benefit.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.6, ease: "easeInOut", delay: i * 0.1}}
          className="flex flex-col gap-4 bg-white p-8 h-full w-full rounded-2xl justify-between items-start text-left py-12 lg:p-4"
        >
          <h1 className="text-3xl font-bold sm:text-xs lg:text-xl">
            {benefit.title}
          </h1>
          <p className="font-medium text-xl sm:text-xs md:text-lg">
            {benefit.description}
          </p>
        </motion.div>
      ))}
    </section>
  );
}
