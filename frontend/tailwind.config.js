/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class", // Fix incorrect dark mode value
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Instrumental: ["Instrumental", "sans-serif"],
        primary: "var(--font-primary)",
        secondary: "var(--font-secondary)",
        sans: "var(--font-family-sans-serif)",
        mono: "var(--font-family-monospace)",
      },
      borderColor: {
        DEFAULT: "var(--color-border, #e5e7eb)", // Fallback to Tailwind's default gray-200
      },
      colors: {
        background: "var(--color-background)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        price: "var(--color-price)",
        rating: "var(--color-rating)",
        text: "var(--color-text)",
        "text-light": "var(--color-text-light)",
        "text-lighter": "var(--color-text-lighter)",
        light: "var(--color-light)",
        lighter: "var(--color-lighter)",
        border: "var(--color-border)",
        "border-dark": "var(--color-border-dark)",
        "border-light": "var(--color-border-light)",
        info: "var(--color-info)",
        "info-dark": "var(--color-info-dark)",
        "info-light": "var(--color-info-light)",
        success: "var(--color-success)",
        "success-dark": "var(--color-success-dark)",
        "success-light": "var(--color-success-light)",
        danger: "var(--color-danger)",
        "danger-dark": "var(--color-danger-dark)",
        "danger-light": "var(--color-danger-light)",
        warning: "var(--color-warning)",
        "warning-dark": "var(--color-warning-dark)",
        "warning-light": "var(--color-warning-light)",
        "form-background": "var(--color-form-background)",
        placeholder: "var(--color-placeholder)",
        ...defaultTheme.colors, // ⬅️ Merge default Tailwind colors
      },
    },
  },
  plugins: [],
};
