import {ReviewsSection} from "~/app/(main)/ReviewsSection";
import React from "react";
import AwsmButton from "~/app/_ui/AwsmButton";
import Link from "next/link";

export default function Reviews() {
  return (
      <section
          className="pt-[2rem] pb-[6rem] tracking-tighter max-w-[min(75rem,96svw)] sm:max-w-[100%] mx-auto mb-12 lg:mb-6">
          <ReviewsSection title="Our Happy Customers" source="Google"/>
          <ReviewsSection title="Upwork Reviews" source="Upwork"/>
          <ReviewsSection title="Contra Reviews" source={"Contra" as any}/>
          <div className="mt-12 md:mx-6 p-10 rounded-xl shadow-sm  text-center transition-colors duration-300 dark:bg-gradient-to-r dark:from-[#02122c] dark:via-[#031531] dark:to-[#01204C] bg-gradient-to-r from-[#dcedfd] to-[#eef6ff]">
              <div className="flex gap-20 md:gap-12 md:flex-col items-center justify-center">
                  <Link
                      href="https://share.google/R3fGmKOo2DcZasNfM"
                      target="_blank"
                      aria-label="See our Google reviews"
                      className="flex flex-col rounded-xl cursor-pointer transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 hover:-translate-y-1"
                  >
                      <h2 className="text-6xl font-extrabold mb-2 dark:text-white text-[#01204C]">
                          5/5
                      </h2>
                      <p className="text-2xl font-light mb-6 dark:text-gray-300 text-[#031531] min-w-[164px]">
                          On Google
                      </p>
                  </Link>
                  <Link
                      href="https://contra.com/amin"
                      target="_blank"
                      aria-label="See our Contra reviews"
                      className="flex flex-col rounded-xl cursor-pointer transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 hover:-translate-y-1"
                  >
                      <h2 className="text-6xl font-extrabold mb-2 dark:text-white text-[#01204C]">
                          5/5
                      </h2>
                      <p className="text-2xl font-light mb-6 dark:text-gray-300 text-[#031531] min-w-[164px]">
                          On Contra
                      </p>
                  </Link>
                  <Link
                      href="https://www.upwork.com/agencies/devino/"
                      target="_blank"
                      aria-label="See our Upwork profile"
                      className="flex flex-col rounded-xl cursor-pointer transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 hover:-translate-y-1"
                  >
                      <h2 className="text-6xl font-extrabold mb-2 dark:text-white text-[#01204C]">
                          100%
                      </h2>
                      <p className="text-2xl font-light mb-6 dark:text-gray-300 text-[#031531] min-w-[164px]">
                          Job Success On Upwork
                      </p>
                  </Link>
                  <div className="flex flex-col">
                      <h2 className="text-6xl font-extrabold mb-2 dark:text-white text-[#01204C]">
                          100+
                      </h2>
                      <p className="text-2xl font-light mb-6 dark:text-gray-300 text-[#031531]">
                          Satisfied Clients
                      </p>
                  </div>
              </div>

              <p className="text-2xl leading-relaxed mb-6 dark:text-gray-400 text-[#01204C]">
                  Let us exceed your expectations and make you our next happy client!
              </p>
              <Link
                  href="https://calendly.com/amin-dhouib"
                  target="_blank"
                  className="relative mt-8"
              >
              <AwsmButton>Let&apos;s Talk</AwsmButton>
              </Link>
          </div>
      </section>
  );
}
