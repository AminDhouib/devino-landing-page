"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { GrFormClose } from "react-icons/gr";
import Header from "~/app/(main)/Header";
import Lottie from "~/app/_ui/Lottie";

import circle from "~/public/lottie/646b74e5d144fc3a5306f282_circle 25.json";
import underlines from "~/public/lottie/646b75178fb7b11360f69f80_line 15 (1).json";
import arrow14 from "~/public/lottie/646b774f55fe78f2dab118fd_arrow 14.json";
import line16 from "~/public/lottie/646ccae06b6fe7807ba01e2a_line 16.json";

const questions = [
  "Trying to fit everyone with the same mold",
  "Overcomplicated software processes",
  "Waiting for weeks to kick off a project",
  "Feeling a bit lost without control",
  "Playing the telephone game with a project manager",
];

const issues = [
  "Ineffective for innovation",
  "Struggles with adapting to the newest technologies",
  "Issues with evolving organizational needs",
  "Competing for a superior technical experience",
];

export default function Hero() {
  const arrow14Ref = useRef(null);
  const isArrow14InView = useInView(arrow14Ref, { amount: 0.5, once: true });

  const issuesRef = useRef(null);
  const isIssuesInView = useInView(issuesRef, { amount: 0.5, once: true });

  return (
    <section className="flex items-center justify-center flex-col sm:text-sm text-2xl font-medium sm:pt-[5rem] pt-[12rem] tracking-tighter max-w-[min(75rem,96svw)] sm:max-w-[100%] sm:px-6 mx-auto">
      <p className="pb-8 sm:pb-4 text-center">
        We are Devino, a pragmatic Software engineering agency
      </p>
      <h1 className="text-8xl sm:text-3xl font-[600] py-1 text-center">
        Devino was born <br />
        to{" "}
        <span className="inline-block relative">
          improve
          <Lottie animationData={circle} />
        </span>{" "}
        engineering <br />
        services for{" "}
        <span className="inline-block relative">
          SaaS
          <Lottie
            animationData={underlines}
            className="absolute -right-4 -bottom-2"
          />
        </span>{" "}
      </h1>

      <div className="py-32 sm:py-12 p-4 grid grid-cols-[1fr,auto,1fr] md:grid-cols-1 items-end gap-4 text-xs">
        <ul className="h-full flex flex-col gap-4 md:text-1xl xs:text-xl lg:text-2xl text-3xl sm:text-center text-left w-full">
          {questions.map(question => {
            return (
              <li
                key={question}
                className="py-2 flex items-center sm:justify-center justify-start gap-2 w-full"
              >
                {question}?
              </li>
            );
          })}
        </ul>

        <div className="w-[208px] sm:w-24" ref={arrow14Ref}>
          {isArrow14InView && <Lottie animationData={arrow14} className="" />}
        </div>

        <Image
          src="/actions/meh.svg"
          width={550}
          height={500}
          alt={"divider"}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isIssuesInView ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-12 sm:p-4 rounded-2xl w-full flex flex-col items-center gap-8 text-2xl tracking-wide leading-relaxed"
        ref={issuesRef}
      >
        <h1 className="font-bold text-3xl sm:text-lg">
          Challenges with{" "}
          <span className="inline-block relative">
            Traditional
            {isIssuesInView && (
              <Lottie
                animationData={line16}
                className="-bottom-2 w-full left-0 absolute"
              />
            )}
          </span>{" "}
          software services:
        </h1>
        <div className="w-full grid grid-cols-2 sm:grid-cols-1 p-4 py-8 gap-8 sm:gap-4">
          {issues.map(issue => {
            return (
              <p className="flex items-start sm:text-xl gap-2" key={issue}>
                <GrFormClose className="shrink-0 mt-2 -rotate-6" />
                {issue}
              </p>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
