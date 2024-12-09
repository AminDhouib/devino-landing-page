"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

const languages = [
  { name: "javascript", logo: "/logos/javascript-plain.svg" },
  { name: "typescript", logo: "/logos/typescript-plain.svg" },
  { name: "rust", logo: "/logos/rust-original.svg" },
  { name: "ruby", logo: "/logos/ruby-plain-wordmark.svg" },
  { name: "python", logo: "/logos/python-plain-wordmark.svg" },
  { name: "java", logo: "/logos/java-original-wordmark.svg" },
  { name: "c", logo: "/logos/c-plain.svg" },
];
const tools = [
  { name: "react", logo: "/logos/react-original-wordmark.svg" },
  { name: "nextjs", logo: "/logos/nextjs-original-wordmark.svg" },
  { name: "tailwindcss", logo: "/logos/tailwindcss-plain-wordmark.svg" },
  { name: "framer-motion", logo: "/logos/framermotion-original-wordmark.svg" },
  { name: "threejs", logo: "/logos/threejs-original-wordmark.svg" },
  { name: "figma", logo: "/logos/figma-original.svg" },
  { name: "rails", logo: "/logos/rails-plain-wordmark.svg" },
  { name: "nodejs", logo: "/logos/nodejs-plain-wordmark.svg" },
];

export default function Skills() {
  return (
    <section className="flex items-center justify-center flex-col my-8 mb-40 gap-4 font-bold text-xl [text-shadow:0_0_2px]">
      <Marquee className="flex gap-4 p-8" speed={35} autoFill>
        {languages.map((ts, i) => (
          <Image
            src={ts.logo}
            alt={ts.name}
            title={ts.name}
            key={ts.name + i}
            width={150}
            height={150}
            className="object-contain px-8 opacity-75 dark:opacity-100 dark:grayscale-0 brightness-0 dark:invert"
          />
        ))}
      </Marquee>

      <Marquee className="flex gap-4 p-8" autoFill speed={35} direction={"right"}>
        {tools.map((ts, i) => (
          <Image
            src={ts.logo}
            alt={ts.name}
            title={ts.name}
            key={ts.name + i}
            width={150}
            height={150}
            className="object-contain px-8  opacity-75 dark:opacity-100  dark:grayscale-0 brightness-0 dark:invert"
          />
        ))}
      </Marquee>
    </section>
  );
}
