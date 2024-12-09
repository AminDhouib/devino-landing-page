import { Hero } from "./(privacy)/Hero";
import Privacy from "./(privacy)/Privacy";
import React from "react";

export const metadata = {
    title: "Devino | Privacy Policy",
};

export default function Page() {
  return (
    <main>
      <Hero />
      <Privacy />
    </main>
  );
}
