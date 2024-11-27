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
import {ThemeProvider} from "~/app/lib/context/ThemeContext";
import AnimatedCursor from "react-animated-cursor";
import StarsBG from "~/app/_ui/StarsBg";

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
    <ThemeProvider>
    <html lang="en">
    <AppHeader/>
    <body
        className={
          inter.className +
          " relative bg-white text-[#1d1e22] dark:bg-darkbg overflow-x-hidden"
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
        <StarsBG />
        <AnimatedCursor
            innerSize={8}
            outerSize={35}
            innerScale={1}
            outerScale={2}
            outerAlpha={0}
            innerStyle={{
              backgroundColor: 'var(--cursor-color)'
            }}
            outerStyle={{
              border: '3px solid var(--cursor-color)',
            }}
        />
        {children}
        <Footer />
      </body>
      </html>
    </ThemeProvider>

  );
}

export const runtime = "edge"; // 'nodejs' (default) | 'edge'
