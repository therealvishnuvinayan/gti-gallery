import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: { DEFAULT: "#ffffff", 50: "#fafbff", 100: "#f6f7fb", 200: "#eef1f7", 300: "#e7ebf3" },
        ink: { DEFAULT: "#0b1220", muted: "#5b6478" },
        brand: { 50:"#f5f8ff",100:"#e9f0ff",200:"#cfe0ff",300:"#a7c4ff",400:"#7aa4ff",500:"#4a7dff",600:"#2f61ea",700:"#254cc0",800:"#1e3f9c",900:"#1a357f" }
      },
      boxShadow: {
        sheet: "0 1px 0 rgba(2,6,23,0.06), 0 8px 24px rgba(2,6,23,0.08)",
        insetRing: "inset 0 1px 0 rgba(255,255,255,0.6)",
      },
      borderRadius: { xl2: "1rem", xl3: "1.25rem" }
    },
  },
  plugins: [],
} satisfies Config;
