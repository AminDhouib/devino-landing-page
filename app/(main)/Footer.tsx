import Link from "next/link";
import {
    FaDiscord,
    FaFacebook,
    FaGlobe,
    FaLinkedin, FaRegCopyright,
    FaYoutube,
} from "react-icons/fa";

import Image from "next/image";
import { FaInstagram } from "react-icons/fa6";
import {event} from "~/app/lib/gtag";
const links = [
  {
    name: "Company",
    links: [
      { name: "Pricing", url: "/pricing" },
      { name: "Team", url: "/team" },
      { name: "uNotes", url: "https://unotes.net"},
      { name: "Contact us", url: "https://calendly.com/amin-dhouib" },
    ],
  },
  // {
  //   name: "SaaS niches",
  //   links: [
  //     { name: "Sales", url: "/" },
  //     { name: "Business Processes", url: "/" },
  //     { name: "Recruitment", url: "/" },
  //     { name: "eLearning", url: "/" },
  //     { name: "Marketing", url: "/" },
  //     { name: "Data", url: "/" },
  //     { name: "Geoservice", url: "/" },
  //     { name: "Developer-focused", url: "/" },
  //     { name: "AI", url: "/" },
  //   ],
  // },
  // {
  //   name: "Email courses",
  //   links: [
  //     { name: "Create Best SaaS User Onboarding Experience", url: "/" },
  //     { name: "How to Spark an Aha Moment", url: "/" },
  //     { name: "Achieve Product-led Growth", url: "/" },
  //     { name: "How to Define and Design an MVP?", url: "/" },
  //   ],
  // },
  // {
  //   name: "Stories",
  //   links: [{ name: "How to choose an UI/UX Agency", url: "/" }],
  // },
  // {
  //   name: "eBooks",
  //   links: [
  //     {
  //       name: "A Non-Boring Guide to How UX Research Is Supposed to Work",
  //       url: "/",
  //     },
  //     {
  //       name: "How to Get Along with Designers and Work Well Together",
  //       url: "/",
  //     },
  //     { name: "How to Succeed with Your Remote Design Team", url: "/" },
  //     { name: "The UX Design Crash Course for Product Owners", url: "/" },
  //     { name: "How We Work: Client's Guide", url: "/" },
  //     { name: "How Design Impacts Your Growth Metrics", url: "/" },
  //   ],
  // },
];

const socials = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/devinosolutions/",
    icon: <FaLinkedin />,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/people/Devino/61555350667542/",
    icon: <FaFacebook />,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/devino_solutions/",
    icon: <FaInstagram />,
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@devino.solutions",
    icon: <FaYoutube />,
  },
];


export default function Footer() {
    const triggerEvent = (social: string) => {
        event({
            action: 'social_media',
            value: social
        })
    }
    const currentYear = new Date().getFullYear();
  return (
    <footer className="max-w-[min(75rem,96svw)] mx-auto bg-darkbg dark:bg-lightbg p-[3rem] pb-8 rounded-2xl lg:flex flex-col grid grid-cols-[auto,minmax(0,1fr)] text-white text-sm gap-16 sm:gap-8 font-medium mb-4">
      <div className="flex flex-col justify-start gap-16 sm:gap-4 text-xs pl-2 pr-8 text-[#5e5f61]">
        <Image
            src="/brand/full_logo.png"
            alt="logo"
            height={46}
            width={145}
            className="cursor-pointer w-3/5 sm:w-2/5 mb-auto"
        />
      </div>
      <div className="grid grid-cols-2 w-full justify-end gap-12 sm:flex flex-col">
        <div
            className={
                "flex flex-col gap-6 "
            }
        >
            <ul
                className={
                    "flex w-full flex-col gap-2 text-gray-500 dark:text-gray-400 font-medium text-xs transition-all duration-300"
                }
            >
                <div className="flex items-center gap-2 w-full">
                    <h1 className="text-xs font-bold shrink-0">Devino Solutions Inc</h1>
                    <hr className="w-full border-current opacity-35"/>
                </div>
                <li>
                    2149 Johnston Road
                </li>
                <li>
                    Ottawa,
                </li>
                <li>
                    Ontario,
                </li>
                <li >
                    Canada
                </li>
                <li>
                    K1G 5K1
                </li>
            </ul>
        </div>
          {links.map(link => (
              <div
                  key={link.name}
                  className={
                  "flex flex-col gap-6 " +
                    (link.name === "eBooks" ? "w-full col-span-3" : "")
                }
            >
                  <div className="text-[#959595] flex items-center gap-2">
                      <h1 className="text-xs font-bold shrink-0">{link.name}</h1>
                      <hr className="w-full border-current opacity-35"/>
                  </div>

                  <ul
                      className={
                      "flex flex-col gap-4 " +
                      (link.name === "eBooks" ? "grid grid-cols-3 gap-x-12" : "")
                  }
              >
                {link.links.map(link => (
                    <Link href={link.url} target={link.url.includes("https") ? "_blank" : '_self'} key={link.name}
                          className={` ${link.url == '/' && "pointer-events-none"} font-medium hover:underline w-max transition-all duration-300`}>
                      {link.name}
                    </Link>
                ))}
              </ul>
            </div>
        ))}
      </div>

      <div
          className="col-span-2 flex justify-between text-[#77787a] dark:text-gray-400 text-xs font-bold pl-2 sm:flex-col-reverse flex-row items-center sm:justify-center gap-2 mt-4">
        <div className="opacity-75 flex w-full gap-2">
            <FaRegCopyright className="mt-auto mb-auto" />
            <div className="mt-auto mb-auto pt-[1px]">{currentYear} Copyright Devino. All rights reserved.</div>
        </div>
        <Link href={"/privacy"} className="sm:mt-6 hover:underline hidden">
          Privacy
        </Link>
        <div className="flex gap-6 text-lg sm:w-full sm:justify-between">
          {socials.map(social => (
              <Link
                  onClick={() => {triggerEvent(social.name)}}
                  href={social.url}
                  key={social.name}
                  target="_blank"
                  className="font-medium hover:opacity-75 transition-all duration-300 dark:text-gray-400"
              >
                {social.icon}
              </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
