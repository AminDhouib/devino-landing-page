import { FAQHero, WorkHero } from "./(faq)/0.Hero";
import Questions from "./(faq)/Questions";
import Work from "./(faq)/Work";

export const metadata = {
    title: "Devino | FAQ",
};

export default function FAQ() {
  return (
    <main className="overflow-hidden z-10">
      <FAQHero />
      <Questions />
      <WorkHero />
      <Work />
    </main>
  );
}
