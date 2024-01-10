/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#9900ff",
        "primary-content": "#ffffff",
        "primary-dark": "#7a00cc",
        "primary-light": "#ad33ff",

        secondary: "#ff0066",
        "secondary-content": "#ffffff",
        "secondary-dark": "#cc0052",
        "secondary-light": "#ff3385",

        background: "#1a171c",
        foreground: "#27222a",
        border: "#413946",

        copy: "#fbfbfc",
        "copy-light": "#dad5dd",
        "copy-lighter": "#a89daf",

        success: "#00ff00",
        warning: "#ffff00",
        error: "#ff0000",

        "success-content": "#000000",
        "warning-content": "#000000",
        "error-content": "#ffffff",
      },
    },
  },
  plugins: [],
};
