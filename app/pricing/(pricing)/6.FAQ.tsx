"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const qas = [
  {
    question: `How do you hire engineers?`,
    answer: `We hire engineers with amazing portfolios and social skills, with a good knowledge of spoken English and a desire to learn. They can start working on a project only after they complete our three months training.`,
  },
  {
    question: `How much does it cost to hire a software engineer?`,
    answer: `If you have an ongoing project, it's best to use our Monthly Subscription plan where you pay a fixed service fee – equivalent to hours of labor planned per month for the entire project.`,
  },
  {
    question: `Can I cancel my project at any time?`,
    answer: `Sure, but do let us know about it beforehand. If you have a monthly subscription, let us know that you want to cancel your project a month before that.`,
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.05, once: true });

  return (
    <section
      ref={ref}
      className="flex sm:px-3 items-center justify-center flex-col text-2xl font-medium pt-[8rem] tracking-tighter max-w-[min(75rem,96svw)] mx-auto gap-6"
    >
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="text-7xl md:text-3xl lg:text-6xl font-[600] py-1 sm:pb-6 pb-24"
      >
        Frequently asked questions
      </motion.h1>

      {qas.map(({ question, answer }) => (
        <QA key={question} question={question} answer={answer} />
      ))}
    </section>
  );
}

const QA = ({ question, answer }: { question: string; answer: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="grid grid-cols-2 sm:grid-cols-1 bg-white dark:bg-deepBlue sm:h-fit rounded-2xl p-8 gap-32 sm:gap-10 py-14"
    >
      <h1 className="font-semibold text-7xl md:text-3xl xs:text-2xl lg:text-6xl">
        {question}
      </h1>
      <p className="leading-[2.75rem] sm:text-xl">{answer}</p>
    </motion.div>
  );
};
