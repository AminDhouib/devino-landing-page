"use client";

import {motion, useInView, useScroll} from "framer-motion";
import L from "next/link";
import {useRef, useState} from "react";
import Lottie from "../_ui/Lottie";

const Image = motion(I);
import underline from "~/public/lottie/63e0e73f39c3d3207a4b5c8f_img-3.json";
import circle from "~/public/lottie/63e0e73f6d4220061e74f95d_img-2.json";
import I from "next/image";
import {Card} from "~/app/pricing/(pricing)/0.Hero";
// import someweirdshape from "~/public/lottie/63e0e809a6b8cb8c0e19d57f_img-1.json";

const Link = motion(L);

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });

  return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center"
           ref={ref}>
          <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: isInView ? 1 : 0, y: isInView ? 0 : 20}}
              transition={{duration: 0.6, ease: "easeInOut"}}
              className="text-skybg text-3xl sm:text-xl md:text-2xl font-normal mb-1 sm:-mb-5"
          >
              Develop with innovation
          </motion.div>
          <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: isInView ? 1 : 0, y: isInView ? 0 : 20}}
              transition={{duration: 0.6, ease: "easeInOut", delay: 0.05}}
              className="text-5xl sm:text-4xl text-darkblue xs:text-3xl font-bold mb-5"
          >
                  <span className="text-orange inline-block relative ml-2">
                  <Image height={"40"} width={"40"} src="/arrow-left.svg" alt="Arrow Right"
                         className="-ml-8 mt-5 -mb-3 sm:w-8"/>
                      Anticipating
                  </span>{" "}
                  tomorrow <div
                  className="hidden md:flex mb-5"></div> challenges, <div
                  className="md:hidden mb-7"></div> Innovating <div
                  className="hidden md:flex mb-5"></div> Beyond
                  <span className="inline-block relative ml-2">
                  Boundaries
                  <Image height={"32"} width={"300"} src="/rectangle.svg" alt="Rectangle"
                         className="-mt-16 sm:-mt-14 sm:-ml-1 -ml-10 h-20 sm:w-32"/>
                </span>
              <Image height={"40"} width={"40"} src="/arrow-right.svg" alt="Arrow Right"
                     className="sm:w-8 sm:-ml-5 float-right -ml-10 -mt-3"/>
          </motion.div>
          <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: isInView ? 1 : 0, y: isInView ? 0 : 20}}
              transition={{duration: 0.6, ease: "easeInOut", delay: 0.2}}
              className="text-skybg text-3xl sm:text-xl font-semibold"
          >
              We build and scale softwares delivering business values,
              <br/>
              Empowering clients to <div
              className="hidden sm:flex"></div> accomplish their goals.
          </motion.div>
          <Link
              href="https://calendly.com/amin-dhouib"
              className="mt-8 bg-skybg rounded-[28px] border border-lightblue text-white px-7 py-3.5 sm:px-5 sm:py-3 md:px-6 md:py-3 inline-flex items-center justify-center text-white text-[22px] sm:text-lg md:text-xl font-semibold "
              target="_blank"
              initial={{opacity: 0, y: 20}}
              animate={{opacity: isInView ? 1 : 0, y: isInView ? 0 : 20}}
              transition={{duration: 0.6, ease: "easeInOut", delay: 0.25}}
          >
              Let’s talk
          </Link>
      </div>
  );
}
