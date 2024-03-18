import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'doodle': "url('/doodle-school-vector.svg'), linear-gradient(to right, var(--tw-gradient-stops))"
      },
      colors: {
        'babyblue': '#BBE7FE',
        'lilac': '#D3B5E5',
        'rose-quartz': '#FFD4DB',
        'cream': '#EFF1DB'
      },
      backgroundSize: {
        '25%': '25%'
      },
      fontFamily: {
        'lato': ['"Lato"', 'sans-serif'],
        'karla': ['"Karla"', 'sans-serif']
      }
    },
  },
  plugins: [],
};
export default config;
