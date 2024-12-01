"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const solutions = [
  {
    problem: {
      title: `Finding the Right Talent is Challenging`,
      text: `Securing software engineering talent with expertise in cutting-edge technologies for SaaS development is a significant hurdle. Identifying professionals with the necessary skill set and the right mindset can be daunting.`,
    },
    solution: `Devino boasts a team of 20+ skilled professionals specializing in software engineering and IT consulting, ready to dive into your project at a moment's notice. Plus, we offer a 3-day FREE trial to showcase our capabilities before any contractual commitment.`,
    image: `jellyfishing`,
    divider: `/svg/divider1.svg`,
  },
  {
    problem: {
      title: `Imminent Deadlines Looming`,
      text: `The workload for your project was underestimated, and now deadlines are quickly approaching. The process of posting job listings and interviewing candidates is time-consuming and not yielding quick enough results.`,
    },
    solution: `Devino can supply the necessary software engineering and IT consulting expertise to ensure your project is completed on time, without the need to add permanent members to your payroll. We are committed to working with you until you're fully satisfied with the outcomes.`,
    image: `lateforwork`,
    divider: `/svg/divider2.svg`,
  },
  {
    problem: {
      title: `Expanding Without Overextending`,
      text: `Your SaaS business has grown significantly, and while you're managing an increasing customer base, you're also looking to innovate with new products. The challenge is maintaining customer satisfaction while branching out.`,
    },
    solution: `DevIno offers remote team support to help you roll out new features, enhance your existing design systems, or even completely overhaul your product designs. This allows you to concentrate on your core business areas and customer engagement without spreading your resources too thin.`,
    image: `badhaircut`,
    divider: `/svg/divider3.svg`,
  },
];

export default function Solutions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.15, once: true });

  const animation = (i: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 },
    transition: { duration: 0.6, ease: "easeInOut", delay: 0.05 * i },
  });

  return (
    <section
      ref={ref}
      className="flex sm:px-3 items-center justify-center flex-col text-2xl font-medium pt-[8rem] tracking-tighter max-w-[min(75rem,96svw)] sm:max-w-[100%] sm:px-6 mx-auto leading-relaxed"
    >
      <motion.h1
        {...animation(0)}
        className="text-5xl md:text-3xl sm:text-md font-[600] py-1 text-center"
      >
        When we’re the best fit
      </motion.h1>
      <motion.p
        {...animation(1)}
        className="pt-8 mb-24 sm:mb-8 text-xl md:text-md sm:text-sm text-center"
      >
        If you find yourself in one of the situations described below,
        <br className="lg:hidden" /> our service is exactly what you need.
      </motion.p>
      {solutions.map(({ problem, solution, image, divider }, i) => {
        const isEven = i % 2 === 0;
        return (
          <Solution
            key={problem.title}
            problem={problem}
            solution={solution}
            image={image}
            divider={divider}
            isEven={isEven}
          />
        );
      })}
    </section>
  );
}

const Solution = ({
  problem,
  solution,
  image,
  divider,
  isEven,
}: {
  problem: any;
  solution: any;
  image: any;
  divider: any;
  isEven: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="w-full"
    >
      <div className="grid grid-cols-[1fr,auto,1fr] sm:grid-cols-1 w-full h-[32rem] sm:h-fit sm:mt-5 sm:mb-5 ">
        <div
          className="bg-white p-10 rounded-2xl flex flex-col sm:w-full justify-between"
          style={{ order: isEven ? 1 : 3 }}
        >
          <div className="flex flex-col gap-8">
            <h1 className="font-bold text-4xl sm:text-3xl">{problem.title}</h1>
            <p className="sm:text-xl sm:mb-2">{problem.text}</p>
          </div>
          <div
            className={`sm:hidden w-full flex justify-start ${
              !isEven && "justify-end"
            }`}
          >
            <Image
              src="/icons/arrow-right.svg"
              height={40}
              width={40}
              className={` ${!isEven && "transform rotate-180"} `}
              alt="arrow right icon"
            />
          </div>
          <div className={"hidden sm:block py-2"}>
            <Image
              src="/icons/arrow-right.svg"
              height={40}
              width={40}
              className="transform rotate-90"
              alt="arrow right icon"
            />
          </div>
        </div>

        <Image
          src={divider}
          alt={image}
          height={100}
          width={200}
          className={
            "relative top-[5rem] sm:hidden " + (isEven ? "left-16" : "right-16")
          }
          style={{ order: 2 }}
        />

        <Image
          src={`/actions/${image}.png`}
          alt={image}
          height={612}
          width={500}
          className="object-contain sm:hidden"
          style={{
            order: !isEven ? 1 : 3,
            height: !isEven ? "70%" : "65%",
          }}
        />
      </div>

      <div
        className={
          "p-12 w-1/2 sm:w-full relative z-10 rounded-2xl sm:-top-10 sm:left-0 sm:translate-x-0 -top-24 left-1/2 -translate-x-1/2 flex flex-col gap-8 " +
          (!isEven ? "bg-black text-white" : "bg-[#ccf095]")
        }
      >
        <h1 className="font-bold text-4xl sm:text-3xl">Solution</h1>
        <p className="sm:text-xl sm:mb-2">{solution}</p>
      </div>
    </motion.div>
  );
};
