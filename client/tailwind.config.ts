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
    addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
    layout: {}, // common layout tokens (applied to all themes)
    themes: {
      light: {
        colors: {
          background: "#dfdfdf", // or DEFAULT
          foreground: "#091220",
          black:"#333333",
          white:"#f2f2f2", // or 50 to 900 DEFAULT
          primary: {
            //... 50 to 900
            foreground: "#FFFFFF",
            DEFAULT: "#4796ae",
          },
          danger: {
            DEFAULT: "#d40000",
            foreground: "#FFFFFF"
          }, 
          secondary: {
            DEFAULT: "#1f3e6f",
            foreground: "#FFFFFF"
          },
          success:{
            DEFAULT: "#2e825d",
            foreground: "#FFFFFF"
          },
          warning:{
            DEFAULT: "#e3ca36",
            foreground: "#FFFFFF"
          }
        },
      },
      dark: {
        colors: {
          background: "#27303e", // or DEFAULT
          foreground: "#ECEDEE",
          black:"#333333",
          white:"#f2f2f2", // or 50 to 900 DEFAULT
          primary: {
            //... 50 to 900
            foreground: "#FFFFFF",
            DEFAULT: "#4796ae",
          },
          danger: {
            DEFAULT: "#d40000",
            foreground: "#FFFFFF"
          },
          secondary: {
            DEFAULT: "#1f3e6f",
            foreground: "#FFFFFF"
          },
          success:{
            DEFAULT: "#2e825d",
            foreground: "#FFFFFF"
          },
          warning:{
            DEFAULT: "#e3ca36",
            foreground: "#FFFFFF"
          }
        },
      }
    },
  }),
  ],
};
export default config;
