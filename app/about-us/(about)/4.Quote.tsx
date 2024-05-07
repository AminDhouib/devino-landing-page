"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const variants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};

export default function Quote() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.section
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={variants}
      transition={{ duration: 0.6 }}
      ref={ref}
      className="bg-white h-full w-full rounded-2xl flex flex-col items-center justify-center font-serif p-8 sm:p-4 text-center max-w-[min(75rem,94svw)] mx-auto mt-12"
    >
      <i className="text-7xl sm:text-2xl">“</i>
      <p className="font-medium text-5xl sm:text-sm leading-[1.3] tracking-tight">
        These days, we can build almost any software. But <br /> just because we
        can, doesn&#39;t mean people will use <br /> it. Companies start to
        realize that amazing user <br /> experience can boost their business,
        that design <br /> can become their competitive advantage. Devino <br />
        is a place where you can gain that advantage.
      </p>

      <div className="flex items-center gap-4 flex-col">
        <Image
          src="/brand/logo.png"
          alt="quote"
          height={100}
          width={100}
          className="rounded-full h-16 w-16 mt-12 sm:w-8 sm:mt-4"
        />
        <p className="text-lg sm:text-xs mt-4 text-[#909090] font-sans">
          Someone, Position @ Company
        </p>
      </div>

      <Image
        src="/verified-by-clutch.svg"
        alt="quote"
        height={128}
        width={128}
        className="h-8 w-32 mt-8 sm:w-24 sm:mt-4"
      />
    </motion.section>
  );
}
