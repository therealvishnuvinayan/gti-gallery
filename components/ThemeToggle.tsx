"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // get saved theme OR default to light
    const stored = (localStorage.getItem("theme") as "light" | "dark") || "light";

    // apply immediately
    document.documentElement.setAttribute("data-theme", stored);
    setTheme(stored);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    setTheme(next);
  };

  return (
    <button 
      className="btn btn-ghost"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
      <span className="hidden sm:inline">
        {theme === "light" ? "Dark" : "Light"}
      </span>
    </button>
  );
}
