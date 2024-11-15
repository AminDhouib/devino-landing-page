import { Hero } from "./(privacy)/Hero";
import Privacy from "./(privacy)/Privacy";
import AppHeader from "~/app/AppHeader";
import React from "react";

export default function Page() {
  return (
    <main>
        <AppHeader/>
      <Hero />
      <Privacy />
    </main>
  );
}
