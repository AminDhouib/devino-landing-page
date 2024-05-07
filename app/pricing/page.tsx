import Hero from "./(pricing)/0.Hero";
import Benefits from "./(pricing)/1.Benefits";
import FreeTrial from "./(pricing)/2.FreeTrial";
import Comparison from "./(pricing)/5.Comparison";
import FAQ from "./(pricing)/6.FAQ";
import GetStarted from "./(pricing)/7.GetStarted";
import Pricing from "~/app/pricing/(pricing)/Pricing";

export default function Page() {
  return (
    <main>
      <Hero />
      <Pricing />
      <Benefits />
      <FreeTrial />
      <Comparison />
      <GetStarted />
    </main>
  );
}
