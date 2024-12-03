"use client";

import { motion, useScroll } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function Hero() {
    return (
        <section className="pt-[12rem] md:pt-[8rem] md:pb-[5rem] pb-[14rem] sm:px-6 text-darkblue dark:text-white flex items-center justify-center flex-col font-medium tracking-tighter text-center relative text-sm sm:text-xs">
            <h1 className="text-7xl leading-[91px] text-center font-bold relative md:text-3xl xs:text-2xl lg:text-6xl lg:leading-[72px] md:leading-[2.5rem]">
                <Image
                    src={"/icons/title.svg"}
                    alt={"title icon"}
                    height={100}
                    width={100}
                    className="h-11 w-11 absolute top-[-2.5rem] left-[-4rem] lg:h-9 lg:w-9 lg:top-[-1.5rem] lg:left-[-3rem]"
                />
                <span className="text-lightblueactive dark:text-lightblue">
          Pay
        </span>{" "}
                a monthly subscription <br />
                for a dedicated software <br />
                engineer
                <Image
                    src={"/icons/square.svg"}
                    alt={"title square"}
                    height={100}
                    width={100}
                    className="h-28 w-72 absolute top-[29%] right-[4.5rem] lg:h-24 lg:w-60 lg:right-[3.75rem] md:h-12 md:w-32 md:right-[1.5rem]"
                />
            </h1>
            <p className="font-semibold text-2xl sm:text-sm md:text-md mt-10 text-darkblue dark:text-gray-400">
                NO SETUP FEES ! NO PROJECT MANAGEMENT FEES ! <br />
                NO OPERATIONAL BURDEN !
            </p>
        </section>
    );
}

export const Card = ({
                         className,
                         base,
                         text,
                         flip,
                     }: {
    className: string;
    base: number;
    text: string;
    flip?: boolean;
}) => {
    const [rotate, setRotate] = useState(1);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const { scrollYProgress } = useScroll();

    scrollYProgress.on("change", (p) => {
        setRotate(1 - p * 100 + 0.5);
        setX(0.2 - p * 100);
        setY(2 - p * 100);
    });

    const rotateValue = Math.max(-4, base * rotate);
    const xValue = Math.max(0, base * x);
    const yValue = Math.max(-4, base * y);

    return (
        <motion.p
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                rotate: (flip ? rotateValue : -rotateValue) + "deg",
                x: (flip ? xValue : -xValue) + "px",
                y: (flip ? yValue : -yValue) + "px",
            }}
            transition={{
                duration: 0.7,
                opacity: { duration: 0.6, delay: base * 0.01 },
            }}
            className={`p-3 px-7 rounded-xl shadow-sm w-max text-darkblue dark:text-white ${className}`}
        >
            {text}
        </motion.p>
    );
};
