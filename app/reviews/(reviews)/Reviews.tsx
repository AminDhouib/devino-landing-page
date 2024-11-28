import {ReviewsSection} from "~/app/(main)/ReviewsSection";
import React from "react";

export default function Reviews() {
  return (
    <section className="pt-[2rem] pb-[6rem] tracking-tighter max-w-[min(75rem,96svw)] mx-auto mb-12 lg:mb-6 md:px-6">
      <ReviewsSection title="Google Reviews" source="Google" />
      <ReviewsSection title="Upwork Reviews" source="Upwork" />
    </section>
  );
}
