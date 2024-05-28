"use client";


import * as gtag from './lib/gtag'
import { Inter } from "next/font/google";
import Script from 'next/script'
import "./globals.css";
import Header from "./(main)/Header";
import Footer from "./(main)/Footer";
import React, { ReactNode, useEffect } from "react";

import Hotjar from "@hotjar/browser";
import AppHeader from "~/app/AppHeader";

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
    <AppHeader/>
    <body
        className={
          inter.className +
          " relative bg-white text-[#1d1e22] overflow-x-hidden"
        }
      >
    <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
    />
    <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gtag.GA_TRACKING_ID}');
        `}
    </Script>
        <Header />
        {children}
        <Footer />

      </body>
    </html>
  );
}

export const runtime = "edge"; // 'nodejs' (default) | 'edge'
