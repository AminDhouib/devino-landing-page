"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

// const benefits = [
//   {
//       title: "Start in hours, not weeks ",
//     description:
//       "We always have our team on bench, ready to get to work immediately.",
//     color: "#ffffff",
//   },
//   {
//     title: "Top Tech talent",
//     description:
//       "Devino's engineers go through a tough candidate selection process and three-month training",
//     color: "#000000",
//     textColor: "#ffffff",
//   },
//   {
//     title: "Team effort benefits",
//     description:
//       "Apart from your full-time candidate, you get the expertise of our team from all our deparments, who will contribute in the project if needed.",
//     color: "#ffffff",
//   },
//   {
//     title: "Direct communication",
//     description:
//       "We don't put the project manager in the middle, we let our clients and employees directly talk to each other.",
//     color: "#ccf095",
//   },
//   {
//     title: "Team flexibility",
//     description:
//       "You can always get more candidates in diffrent fields or downsize your team whenever needed",
//     color: "#ffffff",
//   },
// ];
const benefits = [
  {
    title: "Elite Tech Experts",
    description:
      "Devino's engineers undergo rigorous selection and extensive three-month training.",
    icon: "/icons/tech-expert.svg",
  },
  {
    title: "Collective Expertise",
    description:
      " Access collective expertise from all departments as needed, beyond just your dedicated specialist.",
    icon: "/icons/collective-expertise.svg",
  },
  {
    title: "Open Communication",
    description:
      "Clients and employees communicate directly, without intermediaries.",
    icon: "/icons/communication.svg",
  },
  {
    title: "Flexible Staffing",
    description:
      "Scale your team up or down as needed, with access to candidates across various fields.",
    icon: "/icons/flexible-staffing.svg",
  },
  {
    title: "Immediate Start",
    description: "Our team is always ready for immediate deployment.",
    icon: "/icons/immediate-start.svg",
  },
];
export default function Benefits() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.15, once: true });

  return (
    <motion.section
      ref={ref}
      className="w-full text-center max-w-[min(75rem,96svw)] mx-auto pt-[12rem] sm:pt-[6rem] lg:mt-0 "
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <motion.h1 className="col-span-3 text-darkblue dark:text-white pb-20 text-5xl md:text-3xl xs:text-2xl font-semibold tracking-tight">
        You hire an engineer
        <br />
        <span className="text-xl sm:text-sm md:text-lg text-greytext dark:text-gray-400 ">
          but get more than expected
        </span>
      </motion.h1>
      <div className="w-full gap-10 grid grid-cols-3  lg:grid-cols-2 sm:grid-cols-1">
        {benefits.map((benefit, key) => (
          <Benefit
            key={key}
            title={benefit.title}
            description={benefit.description}
            icon={benefit.icon}
          />
        ))}
      </div>
    </motion.section>
  );
}

const Benefit = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });

  return (
    // <motion.div
    //   ref={ref}
    //   initial={{ opacity: 0, y: 20 }}
    //   animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
    //   transition={{ duration: 0.6, ease: "easeInOut" }}
    //   className="flex flex-col gap-4 p-8 h-[30rem] sm:h-max w-full rounded-2xl justify-between items-start text-left py-12 sm:py-8"
    //   style={{ backgroundColor: color, color: textColor }}
    // >
    //   <h1 className="text-4xl sm:text-xl font-semibold">{title}</h1>
    //   <p className="font-medium text-2xl sm:text-sm leading-relaxed">
    //     {description}
    //   </p>
    // </motion.div>
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="flex gap-8"
    >
      <Image
        src={icon}
        alt={"benefit icon"}
        height={100}
        width={100}
        className={`h-[88px] w-[88px]`}
      />
      <div className="text-left">
        <h3 className="text-xl font-bold dark:text-white">{title}</h3>
        <p className="mt-4 dark:text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
};
