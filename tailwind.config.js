module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#171717",
          secondary: "#DA0037",
          accent: "#569E27",
          neutral: "#EDEDED",
          "base-100": "#EDEDED",
        }
      },
    ],
  },
}
