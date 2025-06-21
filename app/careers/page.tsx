"use client";

import AppHeader from "~/app/AppHeader";
import CareersHero from "~/components/CareersHero";
import WhyDevinoSection from "~/components/ReasonCard";
import BenefitsSection from "~/components/BenefitsSection";
import ValuesSection from "~/components/ValuesSection";
import GrowthSection from "~/components/GrowthSection";
import OpenPositionsSection from "~/components/OpenPositionsSection";

export default function CareersPage() {
    return (
        <>
            <AppHeader
                description="Join Our Remote-First Team | Careers at Devino"
                ogTitle="Build Your Career Beyond Boundaries - Devino Careers"
                ogUrl="https://devino.ca/careers"
                metaDescription="Join Devino's remote-first team that values innovation, personal growth, and work-life balance. Explore open positions in software development, design, and more."
            />

                <main className="min-h-screen">
                    {/* Hero Section */}
                    <CareersHero />

                    {/* Why Devino Section */}
                    <WhyDevinoSection />

                    {/* Values Section */}
                    <ValuesSection />

                    {/* Benefits Section */}
                    <BenefitsSection />

                    {/* Growth Opportunities */}
                    <GrowthSection />


                    {/* Open Positions */}
                    <OpenPositionsSection />
                </main>
        </>
    );
}