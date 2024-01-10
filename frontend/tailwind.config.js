/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: "'Inter Variable', sans-serif",
        poppins: "'Poppins', sans-serif",
      },
      colors: {
        primary: "#9900ff",
        "primary-content": "#ffffff",
        "primary-dark": "#7a00cc",
        "primary-light": "#ad33ff",

        secondary: "#ff0066",
        "secondary-content": "#ffffff",
        "secondary-dark": "#cc0052",
        "secondary-light": "#ff3385",

        background: "#f0eff1",
        foreground: "#fbfbfb",
        border: "#e0dde2",

        copy: "#272329",
        "copy-light": "#685e6e",
        "copy-lighter": "#8e8495",

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
