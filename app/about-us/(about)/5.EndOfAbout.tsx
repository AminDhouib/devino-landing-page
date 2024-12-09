"use client";

import Button from "~/app/_ui/Button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const variants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};

export default function EndOfAbout() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.section
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={variants}
      transition={{ duration: 0.6 }}
      ref={ref}
      className="flex items-center justify-center flex-col font-bold py-[12rem] tracking-tighter max-w-[min(75rem,96svw)] sm:max-w-[100%] sm:px-6 mx-auto gap-8"
    >
      <h1 className="text-6xl font-[600] py-1 text-center sm:text-4xl">Feel the vibe?</h1>
      <Button href={"/contact-us"}>Get in touch</Button>
    </motion.section>
  );
}
