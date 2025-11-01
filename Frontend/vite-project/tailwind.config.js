import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // ✅ must include jsx files
  ],
  theme: {
    extend: {
      // ADDED: Keyframes for a simple fade-in-up animation
      keyframes: {
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      }, // ADDED: Animation utility class
      animation: {
        "fade-in-up": "fade-in-up 0.5s ease-out",
      },
    },
  },

  plugins: [daisyui],
  daisyui: {
    themes: ["synthwave"], // or try "cupcake", "dark", etc.
  },
};
