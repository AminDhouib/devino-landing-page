"use client";

import { motion, useInView } from "framer-motion";
import Button from "../_ui/Button";
import { useRef } from "react";

export default function Hero2() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });

  const animation = (i: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 },
    transition: { duration: 0.6, ease: "easeInOut", delay: 0.05 * i },
  });

  return (
    <section
      ref={ref}
      className="flex items-center justify-center flex-col text-2xl font-medium pt-[12rem] tracking-tighter w-full mx-auto leading-relaxed mb-[5rem]"
    >
      <motion.h1
        {...animation(0)}
        className="text-5xl md:text-3xl sm:text-md sm:px-2 font-[600] py-1 text-center"
      >
        Devino offers a wide range of services tailored to
        <br className="lg:hidden" /> meet the diverse needs of our clients
      </motion.h1>
      <motion.p
        {...animation(1)}
        className="pt-8 text-xl md:text-md sm:text-sm text-center"
      >
        Whether you&#39;re aiming to launch a groundbreaking product, enhance
        your software&#39;s usability
        <br />
        to drive profits, or access a dedicated team of experts for accelerated
        growth,
        <br />
        DevIno is your partner in continuous innovation
      </motion.p>

      <motion.div {...animation(2)} className="mt-10">
        <Button
          href="https://calendly.com/amin-dhouib"
          className="mt-10 text-xl"
        >
          Get Started
        </Button>
      </motion.div>
    </section>
  );
}
