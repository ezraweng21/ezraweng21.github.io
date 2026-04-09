import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        mist: "#f5f1e8",
        sand: "#e7dcc9",
        clay: "#a87447",
        pine: "#1f4d3f",
        sky: "#4f7cff",
        tide: "#2b86a3",
        apricot: "#d9894d",
        leaf: "#4c8b64",
        peach: "#f2c6a0",
        ember: "#bf6f3d",
      },
      boxShadow: {
        panel: "0 16px 40px rgba(17, 24, 39, 0.08)",
      },
      maxWidth: {
        content: "76rem",
      },
    },
  },
  plugins: [],
};

export default config;
