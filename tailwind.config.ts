import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
      xs: { max: "475px" },
      // => @media (max-width: 475px) { ... }
      tall: { raw: "(max-height: 800px)" },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // Define your color palette here
        primary: "#285598",
        primaryhover: "#244d89",
        primaryactive: "#20447a",
        dimlightblue: "#ECF9FE",
        body: "#f1f8fe",
        pastelBlue: "#dcedfd",
        lightblue: "#7dd5f6",
        lightbluehover: "#71c0dd",
        lightblueactive: "#64aac5",
        lightbluedark: "#5EA0B9",
        darkblue: "#01204C",
        lightbg: "#02122c",
        darkbg: "#020e21",
        deepBlue: "#031531",
        lightbg2: "#193A6A",
        orange: "#fb8b5c",
        orangehover: "#e27d53",
        orangeactive: "#c96f4a",
        cream: "#FEEEE7",
        purple: "#9333ea",
        skybg: "#082f49",
        lightgrey: "#D9D9D9",
        greybg: "#DFE6F0",
        offwhite: "#F1F1F1",
        greytext: "#858B91",
      },
    },
  },
  plugins: [],
};
export default config
