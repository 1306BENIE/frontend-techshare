import { type Config } from "tailwindcss";
const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563eb",
          light: "#3b82f6",
          dark: "#1d4ed8",
        },
        secondary: {
          DEFAULT: "#64748b",
          light: "#94a3b8",
          dark: "#475569",
        },
        accent: "#f59e42",
        success: "#22c55e",
        danger: "#ef4444",
        warning: "#facc15",
        info: "#38bdf8",
        dark: "#0f172a",
        light: "#f1f5f9",
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "2rem",
        full: "9999px",
      },
      boxShadow: {
        soft: "0 2px 8px 0 rgba(0,0,0,0.07)",
        waouh: "0 8px 32px 0 rgba(37,99,235,0.15)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
