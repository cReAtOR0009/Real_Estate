/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    backgroundImage: { serviceCard: "url('./assets/serviceCardBg.png')" },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1440px",
      // => @media (min-width: 1024px) { ... }

      xl: "1920px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1920px",
      // => @media (min-width: 1536px) { ... }
    },
    boxShadow: {
      cardlineshadow: "0px 0px 0px 6px  #191919",
    },
    colors: {
      "Purple-60": "#703bf7",
      "Purple-65": "#8254f8",
      "Purple-70": "#946cf9",
      "Purple-75": "#a685fa",
      "Purple-90": "#dbcefd",
      "Purple-95": "#ede7fe",
      "Purple-97": "#f4f0fe",
      "Purple-99": "#fbfaff",
      "Grey-08": "#141414",
      "Grey-10": "#1A1A1A",
      "Grey-15": "#262626",
      "Grey-20": "#333",
      "Grey-30": "#4d4d4d",
      "Grey-40": "#666666",
      "Grey-50": "#808080",
      "Grey-60": "#999999",
      "White-90": "#e4e4e7",
      "White-95": "#f1f1f3",
      "White-97": "#f7f7f8",
      "White-99": "#fcfcfd",
    },

    fontFamily: {
      // sans: ['Graphik', 'sans-serif'],
      // serif: ['Merriweather', 'serif'],
    },
    extend: {},
  },
  plugins: [],
};
