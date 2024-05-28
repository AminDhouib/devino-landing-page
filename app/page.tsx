import Hero from "./(main)/0.Hero";
import Cases from "./(main)/3.Cases";
import GetStarted from "./(main)/8.GetStarted";
import Skills from "~/app/(main)/1.Skills";
import Methodologies from "~/app/(main)/Methodologies";
import Services from "./(main)/Services";
import { usePageView } from "./hooks/usePageView";

export default function Home() {
    usePageView()
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
