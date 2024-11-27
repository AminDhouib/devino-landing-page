import Hero from "./(team)/0.Hero";
import Team from "./(team)/Team";
import React from "react";

export const metadata = {
    title: "Devino | Team",
};

export default function Page() {
  return (
    <main>
      <Hero />
      <Team />
    </main>
  );
}
