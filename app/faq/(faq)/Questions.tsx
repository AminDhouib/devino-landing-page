"use client";

import Question from "./Question";

type IQuestion = {
  title: string;
  description: string;
};

const questions: IQuestion[] = [
  {
    title: "How do you hire engineers?",
    description:
      "Our hiring process includes multiple technical interviews and assessments. New hires work on internal projects for a minimum of 3 months to ensure they meet our standards before handling client work.",
  },
  {
    title: "How much does it cost to hire a software engineer?",
    description:
      "Costs vary based on project scope. Devino offers flexible pricing, either hourly or fixed priced projects, to suit different budgets and maintain quality.",
  },
  {
    title: "Can I cancel my project at any time?",
    description:
      "Yes, you can cancel if your needs change. We offer a flexible model and keep you informed on project status and incurred costs, so you stay in control of your investment.",
  },
];

export default function Questions() {
  return (
    <section className="py-[2rem] tracking-tighter max-w-[min(75rem,96svw)] mx-auto">
      {questions.map((item, key) => (
        <Question key={key} {...item} />
      ))}
    </section>
  );
}
