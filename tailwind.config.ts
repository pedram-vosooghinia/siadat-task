import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customGray: "#454545",
        customGray2: "#F5F5F5",
        customGray3: "#A5A5A5",
        customBlack: "#000000",
        customWhite: "#FFFFFF",
        customPurple:"#A79BF2"
      },
    },
  },
  plugins: [],
};
export default config;
