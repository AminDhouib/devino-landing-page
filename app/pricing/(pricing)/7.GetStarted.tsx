"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import Button from "~/app/_ui/Button";
import {event} from "~/app/lib/gtag";

export default function GetStarted() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });
  const triggerEvent = () => {
    event({
      action: 'contact us',
      value: "pricing_page",
    })
  }
  return (
    <section
      ref={ref}
      className="w-full text-left max-w-[min(75rem,96svw)] sm:max-w-full mx-auto gap-12 py-32 grid sm:grid-cols-1 grid-cols-2"
    >
      <div className="flex flex-col items-start sm:p-6">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="text-[64px] text-darkblue  md:text-3xl xs:text-2xl lg:text-6xl font-semibold leading-[1.2]"
        >
          Have a job for our software engineers?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
          transition={{ duration: 0.6, ease: "easeInOut", delay: 0.1 }}
          className="text-2xl font-medium py-12"
        >
          Tell us a few words about your project and we&#39;ll get back to you
          as soon as we can.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
          transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
        >
          <a
              onClick={triggerEvent}
            href={"https://calendly.com/amin-dhouib"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl sm:text-lg font-bold flex items-center gap-3 text-lightblueactive"
          >
            Contact us
            <Image
              src={"/icons/chevron-right.svg"}
              alt={"benefit icon"}
              height={100}
              width={100}
              className={`h-[20px] w-[12px]`}
            />
          </a>
        </motion.div>
      </div>

      <Image
        src="/icons/contact-sketch.svg"
        alt="working"
        height={500}
        width={500}
        className="justify-self-end sm:justify-self-center sm:w-60 self-start"
      />
    </section>
  );
}
