"use client";

import {AnimatePresence, motion, useInView, useScroll} from "framer-motion";
import L from "next/link";
import React, {useEffect, useRef, useState} from "react";

const Image = motion(I);
import I from "next/image";
import AwsmButton from "~/app/_ui/AwsmButton";
import {TypeAnimation} from "react-type-animation";
import {useTheme} from "~/app/lib/context/ThemeContext";

// import someweirdshape from "~/public/lottie/63e0e809a6b8cb8c0e19d57f_img-1.json";

const Link = motion(L);

const RotateWords = ({words,}: {
    words: string[];
}) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setTimeout(() => {
            setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 2000);
        return () => clearTimeout(interval);
    }, [words.length]);

    return (
        <div className="inline-flex text-left w-full z-10">
            <AnimatePresence>
                <motion.p
                    key={words[index]}
                    initial={{ x: "-50%", opacity: 0, scale: 0.8 }}
                    whileInView={{ x: "0%", opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                        duration: 1.5,
                        ease: [0.25, 0.8, 0.25, 1]
                    }}
                    exit={{ x: "50%", opacity: 0, scale: 0.9 }}
                >
                    {words[index]}
                </motion.p>
            </AnimatePresence>

        </div>
    );
};

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });
    const {theme, toggleTheme} = useTheme();
    const isDark = theme === "dark";

  return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center md:px-8"
           ref={ref}>
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.6, ease: "easeInOut", delay: 0.05 }}
              className="text-5xl sm:text-3xl text-darkblue dark:text-white xs:text-2xl font-bold mb-5"
          >
              <div className="hidden md:flex justify-center">
                  <Image
                      src={ !isDark ? "/brand/full_logo_blue.png" : "/brand/full_logo.png"}
                      alt="logo"
                      height={56}
                      width={185}
                      className="cursor-pointer w-[80wv] mb-12"
                  />
              </div>
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
                  Beyond{" "}
              <span className="inline-block relative ml-2">
              <RotateWords words={['Boundaries']}/>{" "}
              <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                      duration: 1,
                      delay: 1,
                      ease: [0.25, 0.8, 0.25, 1]
                  }}
              >
                <Image
                    height={"32"}
                    width={"300"}
                    src="/rectangle.svg"
                    alt="Rectangle"
                    className="-mt-16 sm:-mt-14 sm:-ml-1 -ml-10 h-20 sm:w-32 dark:opacity-80"
                />
            </motion.div>
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
              className="text-skybg text-3xl dark:text-gray-400 sm:text-lg font-semibold"
          >
              <TypeAnimation
                  sequence={[
                      'We build and scale software.',
                      500,
                      '',
                      'Unlocking exceptional results.',
                      500,
                  ]}
                  speed={50}
                  deletionSpeed={60}
                  repeat={Infinity}
              />
          </motion.div>

          <Link
              initial={{opacity: 0, y: 20}}
              animate={{opacity: isInView ? 1 : 0, y: isInView ? 0 : 20}}
              transition={{duration: 0.6, ease: "easeInOut", delay: 0.25}}
              href="https://calendly.com/amin-dhouib"
              target="_blank"
              className="relative mt-8"
          >
              <AwsmButton>Let&apos;s Talk</AwsmButton>
          </Link>
      </div>
  );
}
