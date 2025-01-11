/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        NohemiRegular: ["Nohemi-Regular"],
        NohemiMedium: ["Nohemi-Medium"],
        NohemiBold: ["Nohemi-Bold"],
        helvetica: ['"Helvetica"', 'sans-serif'],
        'helvetica-oblique': ['"Helvetica Oblique"', 'sans-serif'],
        'helvetica-compressed': ['"Helvetica Compressed"', 'sans-serif'],
        'helvetica-rounded-bold': ['"Helvetica Rounded Bold"', 'sans-serif'],
        'helvetica-bold': ['"Helvetica Bold"', 'sans-serif'],
        'helvetica-bold-oblique': ['"Helvetica Bold Oblique"', 'sans-serif'],
        'helvetica-light': ['"Helvetica Light"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}