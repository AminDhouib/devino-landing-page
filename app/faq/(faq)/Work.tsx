import Image from "next/image";
import Card from "./Card";

type ICard = {
  title: string;
  description: string;
  icon: string;
};

const cards: ICard[] = [
  {
    title: "Good research is key to great products",
    description:
      "We start each project with targeted research to select the exact tools, technologies, and methodologies that align with your goals, creating a detailed blueprint for a high-impact solution.",
    icon: "/icons/research.svg",
  },
  {
    title: "Create software that doesn’t break down",
    description:
      "Our team uses robust functional programming languages to build highly reliable, scalable, and maintainable software, ideal for complex needs in Full-stack, Data Analytics, Machine Learning, and DevOps.",
    icon: "/icons/software.svg",
  },
  {
    title: "Build business relationships that last",
    description:
      "We prioritize long-term partnerships, providing consistent support through every phase—from planning and development to deployment and beyond—ensuring your project’s lasting success.",
    icon: "/icons/business.svg",
  },
];
export default function Work() {
  return (
    <section className="pt-[2rem] pb-[6rem] tracking-tighter max-w-[min(75rem,96svw)] mx-auto">
      <div className="grid grid-cols-3 lg:grid-cols-1 gap-x-14 relative">
        <Image
          src={"/icons/big-arrow.svg"}
          alt={"big arrow icon"}
          height={100}
          width={100}
          className={
            "h-28 w-28 absolute top-[-3rem] left-[28%] lg:top-[25%] lg:rotate-45 lg:left-[70%]"
          }
        />
        <Image
          src={"/icons/small-arrow.svg"}
          alt={"small arrow icon"}
          height={100}
          width={100}
          className={
            "h-20 w-28 absolute bottom-1 right-[28%] lg:bottom-[30%] lg:rotate-[75deg] lg:right-[70%] lg:h-16 lg:w-24"
          }
        />
        {cards.map((item, key) => (
          <Card key={key} {...item} />
        ))}
      </div>
    </section>
  );
}
