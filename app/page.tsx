'use client'
import Hero from "./(main)/0.Hero";
import Cases from "./(main)/3.Cases";
import GetStarted from "./(main)/8.GetStarted";
import Skills from "~/app/(main)/1.Skills";
import Methodologies from "~/app/(main)/Methodologies";
import Services from "./(main)/Services";
import React, {useEffect} from "react";
import * as gtag from "~/app/lib/gtag";
import {usePathname} from "next/navigation";
import AppHeader from "~/app/AppHeader";
import {ReviewsSection} from "~/app/(main)/ReviewsSection";

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
        <main className="overflow-hidden z-10">
            <AppHeader/>
            <Hero />
            <Skills/>
            {/*<Video />*/}
            <Methodologies />
            <Services />
            <ReviewsSection title="What Our Clients Say" source="Google" truncatedChars={200} />
            <Cases />
            <GetStarted />
        </main>
      );
}
