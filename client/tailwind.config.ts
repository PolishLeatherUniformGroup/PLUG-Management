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
    defaultTheme: "dark", // default theme from the themes object
    defaultExtendTheme: "dark", // default theme to extend on custom themes
    layout: {}, // common layout tokens (applied to all themes)
    themes: {
      light: {
        layout: {}, // light theme layout tokens
        colors: {}, // light theme colors
      },
      dark: {
        layout: {}, // dark theme layout tokens
        colors: {}, // dark theme colors
      },
      "plug-dark": {
        extends: "dark",
        background: "#11213c",
        colors: {
          primary: {
            50: '#e7f1fe',
            100: '#c3d4ee',
            200: '#9db7e0',
            300: '#769ad4',
            400: '#517dc8',
            500: '#3964af',
            600: '#2c4e89',
            700: '#1f3862',
            800: '#11213c',
            900: '#030b18',
            DEFAULT: "#11213c",
            foreground: "#ffffff",
          },
        }
      }
    },
  }),
  ],
};
export default config;
