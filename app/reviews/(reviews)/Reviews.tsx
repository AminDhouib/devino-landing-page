import {ReviewsSection} from "~/app/(main)/ReviewsSection";
import React from "react";

export default function Reviews() {
  return (
    <section className="pt-[2rem] pb-[6rem] tracking-tighter max-w-[min(75rem,96svw)] sm:max-w-[100%] mx-auto mb-12 lg:mb-6">
      <ReviewsSection title="Our Happy Customers" source="Google" />
      <ReviewsSection title="Upwork Reviews" source="Upwork" />
    </section>
  );
}
