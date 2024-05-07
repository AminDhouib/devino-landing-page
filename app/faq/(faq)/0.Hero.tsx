import Image from "next/image";

export function FAQHero() {
  return (
    <section className="flex items-center justify-center sm:pt-[5rem] pt-[8rem] tracking-tighter max-w-[min(75rem,96svw)] mx-auto">
      <h1 className="font-bold text-5xl lg:text-4xl pb-6 relative text-darkblue">
        <Image
          src={"/icons/title.svg"}
          alt={"title icon"}
          height={100}
          width={100}
          className="h-11 w-11 absolute top-[-2.5rem] left-[-4rem] lg:h-9 lg:w-9 lg:top-[-1.5rem] lg:left-[-3rem] "
        />
        <span className="text-orange">Frequently</span> Asked Questions
        <Image
          src={"/icons/square.svg"}
          alt={"title square"}
          height={100}
          width={100}
          className="h-[66px] w-44 absolute top-[-0.5rem] right-[12rem] lg:h-12 lg:w-36 lg:right-[8.5rem] lg:top-[-0.25rem]"
        />
      </h1>
    </section>
  );
}
export function WorkHero() {
  return (
    <section className="flex items-center justify-center sm:pt-[5rem] pt-[4rem] tracking-tighter max-w-[min(75rem,96svw)] mx-auto">
      <h1 className="font-bold text-5xl lg:text-4xl pb-6 relative">
        <Image
          src={"/icons/title.svg"}
          alt={"title icon"}
          height={100}
          width={100}
          className="h-11 w-11 absolute top-[-2.5rem] left-[-4rem] lg:h-9 lg:w-9 lg:top-[-1.5rem] lg:left-[-3rem] "
        />
        <span className="text-lightblueactive">How</span> We Work
      </h1>
    </section>
  );
}
