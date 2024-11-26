"use client";

import L from "next/link";
import { useScrollDirection } from "react-use-scroll-direction";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { RiCloseFill, RiMenu3Fill } from "react-icons/ri";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {useWindowSize} from "~/app/hooks/useWindowSize";
import AppHeader from "~/app/AppHeader";
import ThemeToggle from "~/app/_ui/ThemeToggle";
import {useTheme} from "~/app/lib/context/ThemeContext";

const links = [
  { name: "Home", url: "/" },
  { name: "Pricing", url: "/pricing" },
  { name: "Team", url: "/team" },
  { name: "FAQ", url: "/faq" },
];

const Link = motion(L);

export default function Header() {
  const [isInView, setIsInView] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isScrollingUp, isScrollingDown } = useScrollDirection();
    const [isTopOfPage, setIsTopOfPage] = useState(true);
    const { windowSize } = useWindowSize();
    const [isMobile, setIsMobile] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        setIsMobile(windowSize < 1024)
    }, [windowSize]);
  const pathname = usePathname();

  useEffect(() => {
    setIsTopOfPage(window.scrollY === 0);
    if (isScrollingUp) setIsInView(true);
    if (isScrollingDown) {
      setIsInView(false);
      setIsMenuOpen(false);
    }
  }, [isScrollingUp, isScrollingDown]);
  

  return (
      <motion.header
          initial={{y: 0, opacity: 1, scale: 1}}
          animate={{
              y: isInView ? 0 : "-200%",
              opacity: isInView ? 1 : 0,
              scale: isInView ? 1 : 1.05,
          }}
          transition={{duration: 0.3}}
          className={`h-[5rem] lg:bg-neutral-50 lg:rounded-[28px] lg:shadow lg:h-[4rem] xs:h-[3rem] w-full max-w-[min(75rem,93svw)] sticky rounded-2xl p-4 px-8 flex items-center justify-between mx-auto top-4 z-50  lg:py-3 py-4`}
      >
          <AppHeader/>
          <Link
              href="/"
              className="w-[185px] h-full flex absolute ml-5 lg:static lg:ml-0"
          >
              <Image
                  src={
                      theme === "light"
                          ? '/brand/full_logo_blue.png'
                          : '/brand/full_logo.png'
                  }
                  alt="logo"
                  height={56}
                  width={185}
                  className="cursor-pointer w-4/5 sm:w-2/5 mt-auto mb-auto"
              />
          </Link>

          <motion.div
              initial={!isMobile && { width: "fit-content" }}
              animate={!isMobile && { width: !isTopOfPage ? "100%" : "fit-content" }}
              transition={{ duration: 0.3 }}
              className={`px-[26px] py-[15px] lg:hidden ${!isTopOfPage && "w-full"} mx-auto bg-neutral-50 rounded-[28px] shadow justify-center flex items-start gap-6`}>
              {links.map(link => {
                  const isActive = pathname === link.url;

                  return (
                      <Link
                          key={link.name}
                          href={link.url || ""}
                          className={`px-[30px] py-2.5 ${isActive ? 'bg-slate-200' : ''} rounded-3xl justify-center items-center gap-2.5 inline-flex cursor-pointer`}
                      >
                          <motion.div
                              initial={{color: "#01204C"}}
                              animate={{color: isActive ? "#01204C" : "#01204C"}}
                              whileHover={{color: "#71c0dd", scale: 1.05}}
                          >
                              {link.name}
                          </motion.div>
                      </Link>
                  );
              })}
          </motion.div>
          <Link
              href="https://calendly.com/amin-dhouib"
              className="absolute ml-[80%] xl:ml-[76%] lg:hidden w-fit h-fit px-10 py-3.5 dark:bg-white dark:border-transparent bg-sky-950 rounded-[28px] border border-sky-300 justify-center items-center gap-2.5 inline-flex"
              target="_blank"
          >
              <motion.div
                  whileHover={{scale: 1.05}}
                  className="text-white dark:text-sky-950 text-[18px] font-semibold"
              >
                  Let’s talk
              </motion.div>
          </Link>
          <ThemeToggle/>
          <button
              className="text-darkbg hidden ml-auto lg:block text-2xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
              {isMenuOpen ? <RiCloseFill/> : <RiMenu3Fill/>}
          </button>
          <AnimatePresence>
              {isMenuOpen && (
                  <motion.div
                      initial={{y: -50, opacity: 0}}
                      animate={{y: 0, opacity: 1}}
                      exit={{y: -50, opacity: 0}}
                      className="bg-inherit absolute h-[calc(90svh-100%)] pt-11 w-full gap-4 shadow top-full left-0 rounded-xl mt-4 flex flex-col p-4 py-2 uppercase font-medium text-xs tracking-wider overscroll-none overflow-y-scroll"
                  >
                      {links.map((link) => {
                          const isActive = pathname === link.url;
                          return (
                              <Link
                                  onClick={() => setIsMenuOpen(false)}
                                  key={link.name}
                                  href={link.url || ""}
                                  className={`px-[30px] py-2.5 ${isActive ? 'bg-slate-200' : ''} rounded-3xl justify-center items-center gap-2.5 inline-flex cursor-pointer`}
                              >
                                  <motion.div
                                      initial={{color: "#01204C"}}
                                      animate={{color: isActive ? "#01204C" : "#01204C"}}
                                      whileHover={{color: "#71c0dd", scale: 1.05}}
                                  >
                                      {link.name}
                                  </motion.div>
                              </Link>
                          );
                      })}
                      <div className="h-full"/>
                      <Link
                          href="https://calendly.com/amin-dhouib"
                          className="bg-lightbg rounded-[20px] py-4 px-12 flex justify-center items-center uppercase text-white font-mono text-sm font-bold mb-4"
                          target="_blank"
                          onClick={() => setIsMenuOpen(false)}
                      >
                          Let{`'`}s Talk
                      </Link>
                  </motion.div>
              )}
          </AnimatePresence>
      </motion.header>
  );

}
