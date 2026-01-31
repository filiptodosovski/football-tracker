import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "score-bump": {
          "0%": { transform: "scale(1)" },
          "30%": { transform: "scale(1.15)", color: "#10b981" },
          "100%": { transform: "scale(1)" },
        }
      },
      animation: {
        "score-bump": "score-bump 0.5s ease-out forwards",
      }
    }
  },
  plugins: [],
}

export default config
