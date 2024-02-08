import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /* backgroundImage: {
         "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
         "gradient-conic":
           "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
       },*/
    },
  },
  darkMode: "class",
  plugins: [nextui({
    prefix: "nextui", // prefix for themes variables
    addCommonColors: true, // override common colors (e.g. "blue", "green", "pink").
    defaultTheme: "light", // default theme
    layout: {}, // common layout tokens (applied to all themes)
    themes: {
      "plug-dark": {
        extends: "dark",
        foreground: "#f3f3f3",
        background: "#11212f",
        colors: {
          primary: {
            50: "#c0cbde",
            100: "#9eafcb",
            200: "#667ea6",
            300: "#3e5884",
            400: "#253d66",
            500: "#162c4f",
            600: "#0f223f",
            700: "#0d1d36",
            800: "#0d1c31",
            900: "#0f1c2f",
            DEFAULT: "#030b18",
            foreground: "#f3f3f3",
          },
        }
      },"plug-light": {
        extends: "light",
        background: "#e6eaf2",
        foreground: "#252525",
        colors: {
          primary: {
            50: "#c0cbde",
            100: "#9eafcb",
            200: "#667ea6",
            300: "#3e5884",
            400: "#253d66",
            500: "#162c4f",
            600: "#0f223f",
            700: "#0d1d36",
            800: "#0d1c31",
            900: "#0f1c2f",
            DEFAULT: "#030b18",
            foreground: "#f3f3f3",
          },
        }
      }
    },
  }),
  ],
};
export default config;
