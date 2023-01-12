const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        naver: "#03C75A",
        github: "#24292f"
      },
      fontFamily: {
        roboto: ["Roboto", ...defaultTheme.fontFamily.sans],
        nanumSquareNeo: ["NanumSquareNeo", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "#65a30d",
        },
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "#65a30d",
          "base-100": "#25282b",
          neutral: "#4b5259"
        },
      },
    ],
  },
  darkMode: ['class', '[data-theme="dark"]']
};
