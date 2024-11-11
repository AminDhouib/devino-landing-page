"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import Button from "~/app/_ui/Button";

export default function FreeTrial() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });

  return (
    <section
      ref={ref}
      className="w-full mt-24 flex sm:flex-col-reverse items-center justify-between max-w-[min(75rem,96svw)] mx-auto gap-4"
    >
      <Image
        src={"/icons/claim-trial-sketch.svg"}
        alt={"benefit icon"}
        height={100}
        width={100}
        className={`w-96 h-96 sm:w-44 mx-auto`}
      />
      <div className="w-5/12 sm:w-full sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="col-span-3 text-darkblue text-5xl md:text-3xl lg:text-4xl font-semibold leading-[1.2]"
        >
          Claim your FREE 3-day trial
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ duration: 0.6, ease: "easeInOut", delay: 0.05 }}
          className="text-xl text-greytext my-6"
        >
          To let you try before you buy, we can provide the first three days of
          work free of charge.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ duration: 0.6, ease: "easeInOut", delay: 0.07 }}
          className="mb-6 flex items-center gap-4 text-lg"
        >
          <Image
            src={"check-circle-2.svg"}
            alt={"benefit icon"}
            height={100}
            width={100}
            className={`w-[23px] h-[23px]`}
          />
          We can initiate a trial in case we see the mutual fit
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ duration: 0.6, ease: "easeInOut", delay: 0.06 }}
          className=""
        >
          <a
            href={"https://calendly.com/amin-dhouib"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl sm:text-lg font-medium mt-4 flex items-center gap-1 text-lightblueactive"
          >
            Let&#39;s start your trial
            <Image
              src={"/icons/chevron-right.svg"}
              alt={"benefit icon"}
              height={100}
              width={100}
              className={`h-[12px] w-[20px]`}
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
