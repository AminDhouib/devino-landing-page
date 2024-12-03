"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import L from "next/link";
import { useRef } from "react";
import Lottie from "~/app/_ui/Lottie";

import underline1 from "~/public/lottie/64300233722c1a218e78c951_FAQ-2.json";
import crown from "~/public/lottie/6446945282c01e09b7d94d13_crown 02.json";
import circle1 from "~/public/lottie/643fdaead137cf87955accca_circle 01.json";
import wave1 from "~/public/lottie/646b7525bbfe80eff9d5717d_wave 12.json";

const Link = motion(L);

const todayItems = (isCompanyInView: boolean) => [
  {
    top: (
      <div className="inline-block relative text-5xl sm:text-3xl font-bold w-max">
        2024
        {isCompanyInView && (
          <Lottie
            animationData={crown}
            className="-top-4 -right-6 absolute rotate-90 w-8"
          />
        )}
      </div>
    ),
    bottom: "Year founded",
  },
  {
    top: (
      <div className="inline-block relative text-5xl sm:text-3xl font-bold w-max">
        10+
        {isCompanyInView && (
          <Lottie
            animationData={circle1}
            className="-top-3 -left-5 absolute w-24"
          />
        )}
      </div>
    ),
    bottom: "Team members",
  },
  {
    top: (
      <div className="inline-block relative text-5xl sm:text-3xl font-bold w-max">
        10+
        {isCompanyInView && (
          <Lottie
            animationData={wave1}
            className="-bottom-2 w-full left-0 absolute"
          />
        )}
      </div>
    ),
    bottom: "Happy SaaS clients",
  },
];

const companyAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const itemsAnimation = {
  initial: { opacity: 0, scale: 1 },
  animate: { opacity: 1 },
};

export default function Company() {
  const companyRef = useRef(null);
  const isCompanyInView = useInView(companyRef, { amount: 0.5, once: true });
  return (
    <section className="flex sm:px-3 items-center justify-center flex-col text-2xl font-medium pt-[7rem] tracking-tighter max-w-[min(75rem,96svw)] sm:max-w-[100%] sm:px-6 mx-auto">
      <motion.div
        ref={companyRef}
        initial="initial"
        animate={isCompanyInView ? "animate" : "initial"}
        variants={companyAnimation}
        className="flex flex-col gap-16 items-center"
      >
        <h1 className="text-5xl font-bold">
          Devino{" "}
          <span className="inline-block relative">
            today
            {isCompanyInView && (
              <Lottie
                animationData={underline1}
                className="-bottom-2 w-full left-0 absolute"
              />
            )}
          </span>{" "}
        </h1>
        <div className="grid sm:grid-cols-2 grid-cols-4 sm:gap-4 gap-8 text-[#1d1e22]">
          {todayItems(isCompanyInView).map(({ top, bottom }, i) => (
            <motion.div
              key={bottom}
              initial="initial"
              animate={isCompanyInView ? "animate" : "initial"}
              variants={itemsAnimation}
              transition={{
                opacity: { delay: (i + 1) * 0.08, duration: 0.7 },
              }}
              className="bg-white sm:p-8 p-12 flex flex-col justify-between rounded-2xl h-[19.25rem] sm:gap-8 gap-0"
            >
              {top}
              <p className="sm:text-lg text-2xl">{bottom}</p>
            </motion.div>
          ))}
          <Link
            href={"https://calendly.com/amin-dhouib"}
            initial="initial"
            animate={isCompanyInView ? "animate" : "initial"}
            variants={itemsAnimation}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
            transition={{
              type: "spring",
              damping: 8,
              stiffness: 150,
              opacity: { delay: 4 * 0.08, duration: 0.7 },
            }}
            className="bg-[#ff8e5e] sm:p-8 p-12 flex flex-col justify-between rounded-2xl h-[19.25rem] sm:gap-8 gap-0"
          >
            <p className="text-4xl sm:text-3xl font-semibold">
              Become our next client 
            </p>
            <Image
              src="/icons/arrow-right.svg"
              height={32}
              width={32}
              alt="arrow right icon"
            />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
