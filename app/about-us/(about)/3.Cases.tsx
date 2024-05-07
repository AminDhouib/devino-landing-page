"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Case from "./Case";

const cases = [
  {
    info: {
      title: "Talent",
      description: `Imagine a professional, skilled and proactive, with development processes battle-tested on hundreds of clients in dozens of industries.

No freelancer or in-house engineer has such expertise.

A software development agency can have it, though, if it allows knowledge to circulate within the organization.`,
    },
    example: {
      title: `every engineer at Devino gets a 6-month training before they start working with their first client.

Weekly lectures & seminars are called to develop their skills even further.

An engineer can always get support from , Senior team members, Tech Lead and CTO.
`,
      url: "/cases/unotes",
    },
  },
  {
    info: {
      title: "Transparency",
      description: `You know that over-the-wall communication model, where client leaves their requirements on one side, something is getting obscurely done on the other side, and project manager works as a carrier pigeon between the two?

For SaaS apps, with their complex one-of-a-kind products, such communication is a direct path to disaster.`,
    },
    example: {
      title: `So we removed PMs from the equation. That means, Devino’s dedicated engineers communicate with you directly and go deep into the product.

That also means they master soft skills, can work autonomously, manage the design process and themselves.`,
      url: "/cases/unotes",
    },
  },
  {
    info: {
      title: "Tempo",
      description: `It takes ages to launch a design project with an outsourcing Software agency.

You have to make an initial call, fill out the brief, have another call, list the requirements, get a proposal, negotiate the proposal, compare estimations and rates, sign a contract…

Quite time-consuming, isn't it?`,
    },
    example: {
      title: `we at Devino make sure you’d have 2 weeks of work done at the point when you’d only sign a contract with an ordinary agency.

We always have a few engineers on bench ready to get started with a free trial immediately.`,
      url: "/cases/unotes",
    },
  },
];

const containerAnimation = { initial: {}, animate: {} };
const variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

export default function Cases() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <motion.section
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={containerAnimation}
      className="w-full flex flex-col items-center justify-center text-left max-w-[min(75rem,96svw)] mx-auto mt-28 whitespace-pre-wrap sm:text-center"
    >
      <motion.p
        variants={variants}
        transition={{ duration: 0.8 }}
        className="text-3xl sm:text-xl font-medium"
      >
        How did we do it?
      </motion.p>
      <motion.h1
        variants={variants}
        transition={{ duration: 0.8 }}
        className="text-[3.25rem] sm:text-3xl font-bold mb-8"
      >
        Our winning recipe
      </motion.h1>
      {cases.map(({ info, example, }, i) => (
        <Case
          key={info.title + i}
          info={info}
          example={example}
          i={i}
        />
      ))}
    </motion.section>
  );
}
