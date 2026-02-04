module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ramyaas': {
          50: '#fdf9f4',
          100: '#f5ede3',
          500: '#d4a574',
          600: '#b8956a',
          700: '#8b6f47',
        }
      },
      fontFamily: {
        tamil: ['Noto Sans Tamil', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
