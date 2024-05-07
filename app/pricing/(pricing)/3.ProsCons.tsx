import { CgClose } from "react-icons/cg";
import { FaCheck } from "react-icons/fa6";

const pros = [
  "You already have a SaaS product or are looking to launch one",
  "You’re looking to work together, communicate and see progress on a daily basis",
  "You know that design is a process, not a one-time event",
  "You need designers ready to dig deep into your business and your target audience",
];

const cons = [
  "You have a small project such as a landing page or logo, or need some design tweaks",
  'You have ready-made wireframes and need someone to "make them look cool"',
  `You don't have time to communicate with designers and need things done without your involvement`,
  `You're an agency looking for subcontractors`,
  `Your product isn't SaaS`,
];

export default function ProsCons() {
  return (
    <section className="w-full grid grid-cols-2 text-left max-w-[min(75rem,96svw)] mx-auto gap-8 pb-12">
      <div className="flex flex-col gap-8 tracking-wider">
        <h1 className="text-4xl font-bold">Perfect for:</h1>
        <ul className="flex flex-col gap-8">
          {pros.map(pro => (
            <li
              key={pro}
              className="flex items-start gap-4 text-2xl font-[400] leading-relaxed"
            >
              <FaCheck className="shrink-0 text-4xl -rotate-3 pt-2" /> {pro}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-8 tracking-wider">
        <h1 className="text-4xl font-bold">Not a great fit for:</h1>
        <ul className="flex flex-col gap-8">
          {cons.map(pro => (
            <li
              key={pro}
              className="flex items-start gap-4 text-2xl font-[400] leading-relaxed"
            >
              <CgClose className="shrink-0 text-4xl rotate-3 pt-2" /> {pro}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
