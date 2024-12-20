import Image from "next/image";

export function Hero() {
  return (
    <section className="flex items-center justify-center sm:pt-[5rem] pt-[8rem] tracking-tighter max-w-[min(75rem,96svw)] sm:max-w-[100%] sm:px-6 mx-auto">
      <h1 className="font-bold text-5xl lg:text-4xl pb-6 relative text-darkblue dark:text-white">
        <Image
          src={"/icons/title.svg"}
          alt={"title icon"}
          height={100}
          width={100}
          className="h-11 w-11 absolute top-[-2.5rem] left-[-4rem] lg:h-9 lg:w-9 lg:top-[-1.5rem] lg:left-[-3rem] dark:brightness-[4]"
        />
          <span className="text-lightblueactive">Privacy</span> Policy
        <Image
          src={"/icons/square-blue.svg"}
          alt={"title square"}
          height={100}
          width={100}
          color="blue"
          className="h-20 w-48 absolute top-[-1rem] left-[2.5rem] z-[-1] lg:h-12 lg:w-36 lg:right-[8.5rem] lg:top-[-0.25rem] dark:brightness-[4]"
        />
      </h1>
    </section>
  );
}
