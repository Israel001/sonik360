/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jscampaignx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'primary-ads': "url('assets/images/primary-ads.png')",
        'campaign': "url('assets/images/campaign.jpg')",
        'download-app-cover': "url('assets/images/download-app-cover.png')",
        'discount-banner': "url('assets/images/discount-banner-1.jpg')"
      },
      colors: {
        primarygray: "#f8f8f8",
        qblack: "#222222",
        qyellow: "#FFBB38",
        qred: "#EF262C",
        qgray: "#797979",
        qblacktext: "#1D1D1D",
        qgraytwo: "#8E8E8E",
        "qgray-border": "#EFEFEF",
        "qblue-white": "#CBECFF",
        "qh2-green": "#2D6F6D",
      },
      scale: {
        60: "0.6",
      },
    },
  },
  variants: {
    extend: {
      textColor: ["focus-within"],
      borderStyle: ["last"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
