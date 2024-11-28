import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";

interface IQuestion {
  title: string;
  description: string;
}
export default function Question(props: IQuestion) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={` ${
        isOpen ? "bg-pastelBlue dark:bg-deepBlue" : "bg-pastelBlue/75 dark:bg-lightbg"
      } w-full p-6 lg:p-4 cursor-pointer rounded-[20px] [&:not(:last-child)]:mb-6`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <motion.div className="flex items-center justify-between font-bold text-xl lg:text-base dark:text-white">
        {props.title}
        <Image
          src={"/icons/faq-arrow.svg"}
          alt={"arrow icon"}
          height={100}
          width={100}
          className={`h-10 w-10 ${isOpen && "rotate-180"} lg:h-8 lg:w-8 dark:brightness-[0] dark:invert`}
        />
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "fit-content", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-6 dark:text-gray-400"
          >
            {props.description}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
