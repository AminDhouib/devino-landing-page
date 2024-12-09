"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const qas = [
  {
    question: `Why is Software Engineering Expertise Crucial for SaaS Development?`,
    answer: `At Devino, we understand that the backbone of any successful SaaS product is its technological foundation. Our team of experts leverages cutting-edge software engineering practices to build scalable, secure, and innovative solutions. This expertise ensures that SaaS businesses can not only meet but exceed user expectations, delivering superior value and enhancing overall user experience.`,
  },
  {
    question: `What is Devino's Pricing Model for Software Development and IT Consulting Services?`,
    answer: `Devino adopts a transparent pricing model, offering services at a competitive rate of 40 USD per hour. This straightforward approach ensures our clients have clear expectations without any hidden costs. Our model is designed to provide flexibility, allowing for scalable solutions that align with your project's specific needs, whether you require a dedicated team or individual expert consultants.`,
  },
  {
    question: `Can I Outsource Software Development and IT Consulting Services?`,
    answer: `Absolutely. Outsourcing your software development and IT consulting needs to Devino can significantly enhance your operational efficiency, reduce costs, and allow you to tap into a pool of highly skilled professionals. Our team is well-versed in a variety of industries and technologies, ready to bring innovative solutions to your SaaS product. By choosing DevIno, you gain access to top-tier talent and cutting-edge solutions without the need to expand your in-house team.`,
  },
];

const animation = (i: number, isInView: boolean) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 },
  transition: { duration: 0.6, ease: "easeInOut", delay: 0.05 * i },
});

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.15, once: true });

  return (
    <section
      ref={ref}
      className="flex items-center justify-center flex-col text-2xl font-medium pt-[4rem] tracking-tighter max-w-[min(75rem,96svw)] sm:max-w-[100%] sm:px-6 mx-auto gap-6"
    >
      <motion.h1
        {...animation(0, isInView)}
        className="text-5xl md:text-3xl sm:text-md font-[600] py-1 pb-24 sm:pb-8 sm:-mt-10 text-center"
      >
        Frequently asked questions
      </motion.h1>

      {qas.map(({ question, answer }) => (
        <F key={question} question={question} answer={answer} />
      ))}
    </section>
  );
}

const F = ({ question, answer }: { question: string; answer: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="grid grid-cols-2  sm:mx-3 sm:grid-cols-1 bg-white rounded-2xl sm:gap-8 p-8 gap-32 py-14"
    >
      <h1 className="font-semibold sm:text-2xl text-4xl">{question}</h1>
      <p className="leading-[2.75rem] sm:text-lg">{answer}</p>
    </motion.div>
  );
};
