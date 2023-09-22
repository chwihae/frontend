/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sscore: ['S-CoreDream-3Light'],
      notosanskr: ['Noto Sans KR', 'sans-serif'],
    },
    extend: {
      colors: {
        prime1: '#F57F17',
        prime2: '#FFEB3B',
        sub1: '#FBC02D',
        GS1: '#232323',
        GS2: '#494949',
        GS3: '#5A5A5A',
        GS4: '#989898',
        GS5: '#ADADAD',
        GS6: '#CECECE',
      },
      boxShadow: {
        example: '0 0 18px 0 rgba(191, 192, 196, 0.18)',
      },
      spacing: {
        '6px': '0.375rem',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [],
  },
};
