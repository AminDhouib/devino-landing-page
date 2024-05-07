"use client";

import Image from "next/image";
import Button from "../_ui/Button";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const cases = [
  {
    info: {
      title: "Our in-House Project: uNotes",
      description:
        "uNotes, our free app, embodies our dedication to using tech for good. It offers students access to 30,000+ university docs, fostering learning and collaboration. With sharing, interaction, and personal upload features, UNotes transforms how students access and share educational resources.",
      url: "https://unotes.net/",
      buttonText: "Take a Look",
    },
    example: {
      image: "/unotes.png",
      title: "uNotes brought its initial concept into life",
      url: "https://unotes.net",
    },
  },
  {
    info: {
      title: "Cloud Storage Integration: upup",
      description:
        "UPUP is a versatile NPM component simplifying file uploads for web apps. It's open-source, free, and seamlessly integrates with cloud storage services like Google Drive and OneDrive. Developers get an efficient solution for adding file upload functionality to their projects.",
      url: "https://github.com/DevinoSolutions/upup",
      buttonText: "Check it out",
    },
    example: {
      image: "/upup.png",
      title: "UPUP Open-source and Free-to-Use",
      url: "https://github.com/DevinoSolutions/upup",
    },
  },
];

export default function Cases() {
  return (
    <section className="w-full flex flex-col items-center justify-center text-center max-w-[min(75rem,96svw)] mx-auto mt-[12rem] sm:mt-[5rem] gap-16 sm:gap-8 ">
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={`h-fit rounded-lg sm:bg-transparent py-10 w-full mx-auto flex overflow-hidden gap-16 sm:gap-8 p-4 items-center justify-center sm:flex-col ${
        isEven ? "bg-cream" : "bg-gray-100"
      }`}
    >
      <div
        className={`w-full sm:w-full flex flex-col justify-center items-center gap-2.5 ${
          isEven ? "order-last sm:order-none" : ""
        }`}
      >
        <Image
          className="w-fit h-fit rounded-bl-[28px] sm:w-3/4 sm:h-3/4"
          src={example.image}
          alt={example.title}
          width={400}
          height={400}
        />
      </div>
      <div className="w-full sm:w-full flex flex-col justify-center items-center gap-10">
        <div className={`text-left sm:text-center px-4`}>
          <h1 className="text-black leading-[58px] relative text-3xl sm:text-xl font-[30px] sm:font-[20px] mb-4">
            {info.title}
          </h1>
          <p className="text-xl sm:text-lg font-normal">
            {info.description}
          </p>
        </div>
        <a
          href={info.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl sm:text-lg font-medium mt-4 hover:bg-white p-2 rounded-xl"
        >
          {info.buttonText}
          <span className="ml-2">➔</span>
        </a>
      </div>
    </motion.div>
  );
};