import Image from "next/image";

export default function TopReview() {
  return (
    <section className="bg-[#1d1e22] h-full w-full rounded-2xl flex flex-col items-center text-[#f6f4f2] justify-center text-5xl font-serif p-8 text-center max-w-[1200px] mx-auto">
      <i className="text-7xl">“</i>
      <div className="flex flex-col gap-4">
        <p>They are not waiting to be told how to design</p>
        <p>something, they perform their own research of</p>
        <p>the topic and dive into the matter completely</p>
        <p>which results in great outcomes.</p>
      </div>
      <Image
        src="/brand/logo.png"
        alt="quote"
        height={100}
        width={100}
        className="rounded-full h-16 w-16 mt-12"
      />
      <p className="text-lg mt-4 text-[#909090] font-sans">
        Someone, Position @ Company
      </p>
      <Image
        src="/verified-by-clutch.svg"
        alt="quote"
        height={128}
        width={128}
        className="rounded-full h-8 w-32 mt-8"
      />
    </section>
  );
}
