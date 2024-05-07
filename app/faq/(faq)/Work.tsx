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
      "At the start of any new project, Devino does comprehensive research to find out the tools, technologies, and techniques that will solve your problem the best. The aim of our research is to create a blueprint for the optimal custom solution.",
    icon: "/icons/research.svg",
  },
  {
    title: "Create software that doesn’t break down",
    description:
      "We use functional programming languages to create software that is more reliable and maintainable than regular market offerings. This makes our services indispensable in fields like Full-stack, Data Analytics, Machine Learning, DevOps.",
    icon: "/icons/software.svg",
  },
  {
    title: "Build business relationships that last",
    description:
      "From the start, our goal is to build valuable relationships and partnerships that last. We make sure that you and your projects receive the care and support they deserve before, during, and after the release.",
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
