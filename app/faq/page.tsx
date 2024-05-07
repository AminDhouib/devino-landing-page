"use client";

import { FAQHero, WorkHero } from "./(faq)/0.Hero";
import Questions from "./(faq)/Questions";
import Work from "./(faq)/Work";

export default function FAQ() {
  return (
    <main className="overflow-hidden">
      <FAQHero />
      <Questions />
      <WorkHero />
      <Work />
    </main>
  );
}
