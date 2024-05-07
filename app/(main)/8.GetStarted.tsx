"use client";

import Link from "next/link";
import Button from "../_ui/Button";
import { motion, useInView } from "framer-motion";
import React, { useRef, useState } from "react";
import Image from "next/image";
type ButtonType = {
  name: string;
  link: string;
};
const options = [
  {
    title: `Start with a FREE
3-day trial`,
    description: `To reduce your risks and help you get to know us better, we offer the first three days of work at no charge. This way, you can evaluate our skills and decide whether you want to work with us going forward.`,
    button: { name: `Get started`, link: `https://calendly.com/amin-dhouib` },
  },
  {
    title: `Need time
to think it over?`,
    description: `Learn more about our process to get a better idea of how we work and lay down your expectations for future projects.`,
    button: {
      name: `learn more`,
      link: `https://calendly.com/amin-dhouib`,
    },
  },
];

const animation = (i: number, isInView: boolean) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 },
  transition: { duration: 0.6, ease: "easeInOut", delay: 0.05 * i },
});

export default function GetStarted() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.15, once: true });

  return (
    <motion.section
      {...animation(0, isInView)}
      ref={ref}
      className="flex w-full h-full mt-[8rem] sm:mt-[5rem] mb-20 lg:flex-col lg:px-8 lg:pb-20 lg:pt-10 max-w-[min(75rem,96svw)] mx-auto gap-8"
    >
      {options.map(({ title, description, button }, i) =>
        i % 2 === 0 ? (
          <OptionCard
            key={i}
            isFirst={i == 0}
            title={title}
            description={description}
            button={button}
          />
        ) : (
          <OptionCard
            key={i}
            isFirst={i == 0}
            title={title}
            description={description}
            button={button}
          />
        )
      )}
    </motion.section>
  );
}

const OptionCard = ({
  isFirst,
  title,
  description,
  button,
}: {
  isFirst: boolean;
  title: string;
  description: string;
  button: ButtonType;
}) => {
  return (
    <motion.div
      key={title}
      className={` ${
        isFirst ? "bg-dimlightblue" : "bg-cream"
      } flex flex-col rounded-[20px] p-12 lg:p-8 ${
        isFirst ? "gap-12" : "gap-4"
      } h-auto ${isFirst ? "w-8/12" : "w-4/12"} lg:w-full `}
    >
      <h1 className="font-bold text-4xl md:text-2xl sm:text-xl">{title}</h1>
      <div className="flex justify-between gap-14">
        <div className={isFirst ? "w-5/6 lg:w-4/6 sm:w-full" : ""}>
          <p className="leading-[2.25rem] font-medium text-2xl mb-12 md:text-lg">
            {description}
          </p>

          <Link
            href={button.link}
          >
            <motion.div
                className={`${
                    isFirst ? "bg-orange text-white" : "bg-dimlightblue text-orange"
                } whitespace-nowrap py-3 px-10 md:px-8 items-center hover:scale-105 uppercase font-mono w-max tracking-wide transition-all duration-300 rounded-[40px] font-semibold text-xl md:text-lg`}
                whileHover={{scale: 1.1}}>
              {button.name}
            </motion.div>
          </Link>
        </div>
        {isFirst && (
          <Image
            src={"/icons/trial-sketch.svg"}
            alt={"arrow icon"}
            height={100}
            width={100}
            className={`h-full w-36 sm:hidden lg:w-32 md:w-28`}
          />
        )}
      </div>
    </motion.div>
  );
};
