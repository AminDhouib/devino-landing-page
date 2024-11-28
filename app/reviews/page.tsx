import { Hero } from "./(reviews)/Hero";
import Reviews from "./(reviews)/Reviews";
import React from "react";
import reviews from "~/app/lib/reviews";

export const metadata = {
    title: "Devino | Why Clients Love Us"
};


export default function Page() {
    if(reviews.length === 0) return null;

    return (
    <main>
      <Hero />
      <Reviews />
    </main>
  );
}
