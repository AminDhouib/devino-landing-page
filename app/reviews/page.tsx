import { Hero } from "./(reviews)/Hero";
import Reviews from "./(reviews)/Reviews";
import React from "react";

export const metadata = {
    title: "Devino | Clients Reviews",
};

export default function Page() {
  return (
    <main>
      <Hero />
      <Reviews />
    </main>
  );
}
