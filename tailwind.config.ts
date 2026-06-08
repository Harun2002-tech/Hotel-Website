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
        gold: {
          50: "#fdf8ef",
          100: "#f9edd4",
          200: "#f2d8a8",
          300: "#e9bc72",
          400: "#df9a3f",
          500: "#d4822a",
          600: "#b86520",
          700: "#964d1d",
          800: "#7a3f1f",
          900: "#65351c",
        },
        navy: {
          50: "#f4f6f9",
          100: "#e8ecf2",
          200: "#cdd6e4",
          300: "#a2b3cc",
          400: "#718daf",
          500: "#516f94",
          600: "#3f597b",
          700: "#344865",
          800: "#2d3d54",
          900: "#1a2332",
          950: "#0f1520",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "float-once": "floatOnce 1.8s ease-out forwards",
        "pop-in": "popIn 0.5s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        floatOnce: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "60%": { transform: "translateY(-6px)", opacity: "1" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        popIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
