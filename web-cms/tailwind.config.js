/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '2xs': '.65rem',
        '3xs': '.5rem',
      },
      colors: {
        'mineral-green': {
          50: '#f5f8f7',
          100: '#dfe8e6',
          200: '#bed1ce',
          300: '#95b3ae',
          400: '#6f928e',
          500: '#557773',
          600: '#425f5c',
          700: '#3b5250',
          800: '#2f403f',
          900: '#2a3736',
          950: '#151e1e',
        },
      },
    },
    plugins: [],
  }
}