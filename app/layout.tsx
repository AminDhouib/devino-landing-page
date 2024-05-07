"use client";

import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./(main)/Header";
import Footer from "./(main)/Footer";
import { ReactNode, useEffect } from "react";

import Hotjar from "@hotjar/browser";

const siteId = 3891462;
const hotjarVersion = 6;

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "SaaS Software Agency | Devino",
//   description: "Pragmatic Software Agency for SaaS",
// };

export default function RootLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;
    Hotjar.init(siteId, hotjarVersion);
  }, []);

  return (
    <html lang="en">
      <body
        className={
          inter.className +
          " relative bg-white text-[#1d1e22] overflow-x-hidden"
        }
      >
        <Header />
        {children}
        <Footer />
       
      </body>
    </html>
  );
}

export const runtime = "edge"; // 'nodejs' (default) | 'edge'
