"use client";

import {motion, useInView, useScroll} from "framer-motion";
import L from "next/link";
import {useRef, useState} from "react";

const Image = motion(I);
import I from "next/image";

// import someweirdshape from "~/public/lottie/63e0e809a6b8cb8c0e19d57f_img-1.json";

const Link = motion(L);

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });

  return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center"
           ref={ref}>
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.6, ease: "easeInOut", delay: 0.05 }}
              className="text-5xl sm:text-4xl text-darkblue dark:text-white xs:text-3xl font-bold mb-5"
          >
        <span className="text-lightblueactive inline-block relative ml-2">
        <Image
            height={"40"}
            width={"40"}
            src="/arrow-left.svg"
            alt="Arrow Left"
            className="-ml-8 mt-5 -mb-3 sm:w-8 dark:filter dark:brightness-[6]"
        />
        Anticipating
        </span>{" "}
                  Tomorrow’s{" "}
                  <div className="hidden md:flex mb-5"></div>
                  challenges,{" "}
                  <div className="md:hidden mb-7"></div>
                  Innovating{" "}
                  <div className="hidden md:flex mb-5"></div>
                  Beyond
                  <span className="inline-block relative ml-2">
            Boundaries
            <Image
                height={"32"}
                width={"300"}
                src="/rectangle.svg"
                alt="Rectangle"
                className="-mt-16 sm:-mt-14 sm:-ml-1 -ml-10 h-20 sm:w-32 dark:opacity-80"
            />
        </span>
          <Image
              height={"40"}
              width={"40"}
              src="/arrow-right.svg"
              alt="Arrow Right"
              className="sm:w-8 sm:-ml-5 float-right -ml-10 -mt-3 dark:filter dark:brightness-[6]"
          />
          </motion.div>

          <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: isInView ? 1 : 0, y: isInView ? 0 : 20}}
              transition={{duration: 0.6, ease: "easeInOut", delay: 0.2}}
              className="text-skybg text-3xl dark:text-gray-400 sm:text-xl font-semibold"
          >
              We build and scale software.
              <br/>
              Empowering you to <div
              className="hidden sm:flex"></div> accomplish your goals.
          </motion.div>
          <Link
              initial={{opacity: 0, y: 20}}
              animate={{opacity: isInView ? 1 : 0, y: isInView ? 0 : 20}}
              transition={{duration: 0.6, ease: "easeInOut", delay: 0.25}}
              href="https://calendly.com/amin-dhouib"
              target="_blank"
              className="relative mt-8 px-10 py-3.5 overflow-hidden font-medium text-white bg-darkblue dark:bg-white dark:text-darkblue rounded-full shadow-inner group">
                  <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-lightbg2 dark:bg-darkblue/20 group-hover:h-full ease"></span>
                      <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-lightbg2 dark:bg-darkblue/20 group-hover:h-full ease"></span>
                      <span className="absolute inset-0 w-full h-full duration-300 delay-300 dark:bg-darkblue bg-lightbg2/50 opacity-0 group-hover:opacity-100"></span>
                      <span className="relative flex items-center justify-center space-x-2 transition-colors duration-300 delay-200 group-hover:text-white ease">
                      <span>Let&apos;s Talk</span>
                  </span>
          </Link>
      </div>
  );
}
