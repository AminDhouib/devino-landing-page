import Hero from "./(team)/0.Hero";
import Team from "./(team)/Team";
import AppHeader from "~/app/AppHeader";
import React from "react";

export default function Page() {
  return (
    <main>
        <AppHeader/>
      <Hero />
      <Team />
    </main>
  );
}
