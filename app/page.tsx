'use client'
import Hero from "./(main)/0.Hero";
import Cases from "./(main)/3.Cases";
import GetStarted from "./(main)/8.GetStarted";
import Skills from "~/app/(main)/1.Skills";
import Methodologies from "~/app/(main)/Methodologies";
import Services from "./(main)/Services";
import {useEffect} from "react";
import * as gtag from "~/app/lib/gtag";
import {usePathname} from "next/navigation";

export default function Home() {

    const pathname = usePathname()
    useEffect(() => {
        if (typeof window === 'undefined') {
            return
        }

        const handleRouteChange = (url: string) => {
            gtag.pageView(url)
        }

        handleRouteChange(pathname)
    }, [pathname]);
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
