import Hero from "./(main)/0.Hero";
import Cases from "./(main)/3.Cases";
import GetStarted from "./(main)/8.GetStarted";
import Video from "./(main)/9.Video";
import Skills from "~/app/(main)/1.Skills";
import Solutions from "./(main)/6.Solutions";
import Methodologies from "~/app/(main)/Methodologies";
import Services from "./(main)/Services";

export default function Home() {
  return (
    <main className="overflow-hidden">
        <Hero />
        <Skills/>
        {/*<Video />*/}
        <Methodologies />
        <Services />
        <Cases />
        <GetStarted />
    </main>
  );
}
