import { motion, useInView } from "framer-motion";
import I from "next/image";
import L from "next/link";
import { useRef } from "react";
import Button from "~/app/_ui/Button";

const Link = motion(L);
const Image = motion(I);

type Props = {
  info: { title: string; description: string };
  example: { title: string; url: string };
  i: number;
};

export default function Case({ info, example, i }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const reviewRef = useRef(null);
  const isReviewInView = useInView(ref, { amount: 0.8, once: true });

  return (
    <div
      key={info.title}
      className="grid grid-cols-2 gap-16 sm:gap-4 p-8 h-full w-full rounded-2xl text-left sm:flex flex-col items-center justify-center "
    >
      <div className={`flex flex-col gap- pr-4`}>
        <h1 className="text-3xl sm:text-2xl font-bold">{info.title}</h1>
        <p className="font-medium text-2xl sm:text-xl leading-relaxed tracking-wide">
          {info.description}
        </p>
      </div>

      <Link
        ref={ref}
        href={example.url}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", damping: 10, stiffness: 150 }}
        className={`flex flex-col gap-[4rem] sm:gap-6 rounded-2xl py-14 sm:py-6 p-2 relative overflow-hidden`}
        style={{
          backgroundColor:
            i === 0 ? "#ffffff" : i === 1 ? "#ccf095" : "#e4e4e4",
        }}
      >
        <Image
          initial={{ opacity: 0, y: -20, rotate: 90 }}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : -20,
          }}
          transition={{ type: "spring", damping: 10, stiffness: 150 }}
          src="/icons/arrow-right.svg"
          height={40}
          width={40}
          alt="arrow right icon "
          className="ml-[2rem] sm:ml-4 sm:w-8 w-10"
        />

        <p className="font-medium text-2xl px-[2rem] sm:px-4 sm:text-sm">
          {example.title}
        </p>

        <div className="px-8 flex items-center uppercase font-mono w-max tracking-wide font-medium">
          read the full case
        </div>
      </Link>
    </div>
  );
}
