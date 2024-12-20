import Image from "next/image";

interface ICard {
  title: string;
  description: string;
  icon: string;
}
export default function Card(props: ICard) {
  return (
    <div className="bg-pastelBlue dark:bg-darkblue rounded-[20px] p-8 lg:mb-6">
      <Image
        src={props.icon}
        alt={"card icon"}
        height={100}
        width={100}
        className={"h-16 w-16 lg:w-12 lg:h-12 dark:brightness-[0] dark:invert"}
      />
      <h2 className="text-lightblueactive dark:text-white mt-4 mb-6 font-semibold text-2xl lg:text-lg lg:my-2">
        {props.title}
      </h2>
      <p className="text-lg lg:text-base dark:text-gray-400">{props.description}</p>
    </div>
  );
}
