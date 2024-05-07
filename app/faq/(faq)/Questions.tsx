"use client";

import Question from "./Question";

type IQuestion = {
  title: string;
  description: string;
};

const questions: IQuestion[] = [
  {
    title:
      "Why is Software Engineering Expertise Crucial for SaaS Development?",
    description:
      "At Devino, we understand that the backbone of any successful SaaS product is its technological foundation. Our team of experts leverages cutting-edge software engineering practices to build scalable, secure, and innovative solutions. This expertise ensures that SaaS businesses can not only meet but exceed user expectations, delivering superior value and enhancing overall user experience.",
  },
  {
    title: "Can I Outsource Software Development and IT Consulting Services?",
    description:
      "At Devino, we recognize the importance of flexibility and efficiency in today's fast-paced business environment. Outsourcing software development and IT consulting services can be a strategic decision to leverage specialized expertise, scale resources, and reduce operational costs. Our proven track record in delivering high-quality solutions coupled with comprehensive IT consulting ensures seamless integration and alignment with your business objectives",
  },
  {
    title: "How do you hire engineers?",
    description:
      "Our approach to hiring engineers is rooted in seeking top talent who embody our core values of innovation, collaboration, and excellence. We meticulously evaluate candidates based on their technical expertise, problem-solving skills, and cultural fit. Through rigorous interviews, technical assessments, and thorough screening processes, we ensure that each engineer we hire possesses the necessary skills and mindset to excel in delivering high-quality solutions. Additionally, we prioritize continuous learning and growth, providing our engineers with opportunities for professional development and staying updated with the latest technologies and industry trends. Trust Devino to assemble a team of skilled engineers dedicated to driving your project's success with precision and expertise.",
  },
  {
    title: "How much does it cost to hire a software engineer?",
    description:
      "",
  },
  {
    title: "Can I cancel my project at any time?",
    description:
      "",
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
