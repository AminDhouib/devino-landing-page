import Image from "next/image";

export default function Hero() {
  return (
    <section className="flex items-center justify-center sm:pt-[5rem] pt-[8rem] tracking-tighter max-w-[min(75rem,96svw)] mx-auto">
      <h1 className="font-bold text-5xl md:text-3xl pb-6 relative text-darkblue dark:text-white">
        <Image
          src={"/icons/title.svg"}
          alt={"title icon"}
          height={100}
          width={100}
          className="h-11 w-11 md:w-8 md:top-[-1.5rem] md:left-[-2.5rem] absolute top-[-2.5rem] left-[-4rem]"
        />
        <span className="text-lightblueactive">Meet</span> Our Team
        <Image
          src={"/icons/square.svg"}
          alt={"title square"}
          height={100}
          width={100}
          className="h-[76px] md:h-[40px] md:right-[-1rem] md:top-[-0.2rem] w-52 absolute top-[-1rem] right-[1.5rem]"
        />
      </h1>
    </section>
  );
}
