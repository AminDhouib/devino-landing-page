"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useWindowSize } from "~/app/hooks/useWindowSize";

type Service = {
  title: string;
  description: string;
  icon: string;
};

const services: Service[] = [
  {
    title: "DevOps & Cloud",
    description:
      "Optimizing software development with cloud-based solutions, automation, and continuous integration for faster, more reliable deployments.",
    icon: "devops.svg",
  },
  {
    title: "Machine Learning",
    description:
      "Turning your data into strategic insights with custom machine learning models designed to solve specific business challenges.",
    icon: "machine_learning.svg",
  },
  {
    title: "API Development",
    description:
      "Creating secure and efficient APIs that connect your applications, improve functionality, and enable smooth data exchange.",
    icon: "api.svg",
  },
  {
    title: "Web Development",
    description:
      "Building dynamic, responsive websites that deliver seamless user experiences and drive online growth.",
    icon: "code.svg",
  },
  {
    title: "Web Automation",
    description:
      "Automating repetitive tasks to save time, reduce errors, and optimize your online workflows and operations.",
    icon: "automation.svg",
  },
  {
    title: "Digital Design",
    description:
      "Designing impactful digital visuals that enhance user engagement and create memorable brand experiences.",
    icon: "ui.svg",
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.15, once: true });

  return (
    <motion.div className="mt-[12rem] sm:mt-[5rem] max-w-[min(75rem,96svw)] w-full flex flex-col mx-auto">
      <motion.div className="mb-12 sm:mb-6 w-full text-center text-darkblue text-4xl xs:text-xl sm:text-2xl font-bold">
        Areas Of Expertise
      </motion.div>
      <motion.section
        ref={ref}
        className="w-full flex justify-between mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <motion.div className="lg:hidden m-auto pr-10">
          <Image
            alt={"service_sketch"}
            src={"/service_sketch.png"}
            height={"393"}
            width={"425"}
            className="xl:w-72"
          />
        </motion.div>
        <motion.div className="grid grid-cols-3 lg:grid-cols-2 sm:flex sm:flex-col sm:justify-center items-center justify-center text-center w-2/3 mx-auto gap-8 ">
          {services.map((service, key) => (
            <ServiceCard key={key} service={service} />
          ))}
        </motion.div>
      </motion.section>
    </motion.div>
  );
}

const ServiceCard = ({ service }: { service: Service }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.15, once: false });
  const [isFlipped, setIsFlipped] = useState(false);

  const { windowSize } = useWindowSize();
  const isMobile = windowSize < 1024;
  useEffect(() => {
    if (isInView && isMobile)
      setTimeout(() => {
        setIsFlipped(true);
      }, 600);
    else setIsFlipped(false);
  }, [isInView, isMobile]);

  const startFlip = () => {
    if (!isFlipped) setIsFlipped(true);
  };
  const endFlip = () => {
    if (isFlipped) setIsFlipped(false);
  };
  return (
    <motion.div
      ref={ref}
      onMouseEnter={startFlip}
      onMouseLeave={endFlip}
      animate={{ perspective: 1000 }}
      className="relative w-[230px] h-[332px]"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? -180 : 0, perspective: 1000 }}
        transition={{ duration: 0.3 }}
        className={`${
          isFlipped ? "bg-darkblue text-white" : "bg-[#f1f8fe] text-darkblue"
        } cursor-pointer sm:mr-auto rounded-[32px] transition-colors duration-300 h-full w-full [backface-visibility:hidden] absolute top-0 left-0 z-10 p-5 flex items-center justify-center flex-col gap-4`}
      >
        <Image
          alt={service.icon}
          src={!isFlipped ? "/blue_" + service.icon : "/" + service.icon}
          height={"70"}
          width={"70"}
          className=""
        />
        <motion.h2 className="flex justify-start text-center font-bold text-[20px] text-black">
          {service.title}
        </motion.h2>
      </motion.div>

      {/* ---------------- */}

      <motion.div
        animate={{ rotateY: isFlipped ? 0 : 180, perspective: 1000 }}
        transition={{ duration: 0.3 }}
        className={`h-full w-full flex justify-center items-center text-center text-[16px] absolute top-0 left-0 p-5 bg-darkblue bg-opacity-90 rounded-[32px] transition-colors duration-300 text-white border border-[#f1f8fe] flex-col gap-4`}
      >
        <Image
          alt={service.icon}
          src={!isFlipped ? "/blue_" + service.icon : "/" + service.icon}
          height={"70"}
          width={"70"}
          className=""
        />
        {service.description}
      </motion.div>
    </motion.div>
  );
};
