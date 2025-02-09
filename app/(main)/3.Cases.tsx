"use client";

import Image from "next/image";
import Button from "../_ui/Button";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { event } from "~/app/lib/gtag";
import AwsmButton from "~/app/_ui/AwsmButton";
import Link from "next/link";

const cases = [
  {
    info: {
      title: "uNotes",
      description:
        "uNotes is a note-sharing system with 5K monthly active users that offers students access to 30,000+ user-uploaded university docs.",
      url: "https://unotes.net/",
      buttonText: "Check it out",
    },
    example: {
      image: "/unotes.png",
      title: "uNotes - Instant Access to 30,000+ Past Papers and Notes",
      url: "https://unotes.net",
    },
  },
  {
    info: {
      title: "Shorty",
      description:
        "A growing platform with currently currently a 50% month-over-month growth, Shorty is a Youtube and Spotify summary tool that helps users save time and learn faster.",
      url: "https://aishorty.com/",
      buttonText: "Check it out",
    },
    example: {
      image: "/shorty.png",
      title: "Shorty - AI Summarizer for Youtube and Spotify",
      url: "https://aishorty.com/",
    },
  },
  {
    info: {
      title: "Upup",
      description:
        "A versatile NPM component simplifying file uploads for web apps. It's open-source, free, secure, and seamlessly integrates with cloud storage services like Google Drive and OneDrive.",
      url: "https://github.com/DevinoSolutions/upup",
      buttonText: "Check it out",
    },
    example: {
      image: "/upup.png",
      title:
        "Upup Open-Source React File Upload Component With Built-In Cloud Storage Integrations",
      url: "https://github.com/DevinoSolutions/upup",
    },
  },
];

export default function Cases() {
  return (
    <section className="w-full flex flex-col items-center justify-center text-center max-w-[min(75rem,96svw)] sm:max-w-[100%] sm:px-6 mx-auto mt-[12rem] sm:mt-[5rem] gap-16 sm:gap-8 ">
      <motion.div className="w-full text-center text-darkblue dark:text-white text-4xl xs:text-xl sm:text-2xl font-bold">
        Explore Our In-House Projects
      </motion.div>
      {cases.map(({ info, example }, i) => {
        const isEven = i % 2 === 0;

        return (
          <Case
            key={info.title}
            info={info}
            example={example}
            isEven={isEven}
          />
        );
      })}
    </section>
  );
}

const Case = ({
  info,
  example,
  isEven,
}: {
  info: any;
  example: any;
  isEven: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });
  const triggerEvent = () => {
    event({
      action: "in_house_project",
      value: example.title,
    });
  };
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={`h-fit rounded-lg sm:bg-transparent py-10 w-full mx-auto flex overflow-hidden gap-16 sm:gap-8 p-4 items-center justify-center sm:flex-col ${
        isEven
          ? "bg-pastelBlue dark:bg-deepBlue"
          : "bg-pastelBlue bg-opacity-50 dark:bg-darkblue"
      }`}
    >
      <div
        className={`w-full sm:w-full flex flex-col justify-center items-center gap-2.5 ${
          isEven ? "order-last sm:order-none" : ""
        }`}
      >
        <Image
          className="w-fit h-fit sm:w-3/4 sm:h-3/4 dark:brightness-[0] dark:invert"
          src={example.image}
          alt={example.title}
          width={400}
          height={400}
        />
      </div>
      <div className="w-full sm:w-full flex flex-col justify-center items-center gap-10">
        <div className={`text-left sm:text-center px-4`}>
          <h1 className="text-black dark:text-white leading-[58px] relative text-3xl sm:text-xl font-[30px] sm:hidden mb-4">
            {info.title}
          </h1>
          <p className="text-xl sm:text-lg font-normal dark:text-gray-400">
            {info.description}
          </p>
        </div>
        <Link
          onClick={triggerEvent}
          href={info.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          <AwsmButton>
            {info.buttonText}
            <span className="ml-2">➔</span>
          </AwsmButton>
        </Link>
      </div>
    </motion.div>
  );
};
