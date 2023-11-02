/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      score: ['S-CoreDream-3Light'],
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
        bg: '#F3F3F3',
      },
    },
  },
  daisyui: {
    themes: [],
  },
  plugins: [
    require('daisyui'),
    ({ addUtilities }) => {
      addUtilities({
        /* S-CoreDream-3Light */
        '.score-intro': {
          fontFamily: 'S-CoreDream-3Light',
          fontSize: '32px',
          fontStyle: 'normal',
          fontWeight: 200,
          lineHeight: 'normal',
          letterSpacing: '0.64px',
        },
        '.score-bold24': {
          fontFamily: 'S-CoreDream-3Light',
          fontSize: '24px',
          fontWeight: 600,
          lineHeight: 1.6,
          letterSpacing: '0.48px',
        },
        '.score-bold20': {
          fontFamily: 'S-CoreDream-3Light',
          fontSize: '20px',
          fontWeight: 600,
          lineHeight: 1.6,
          letterSpacing: '0.4px',
        },
        '.score-bold18': {
          fontFamily: 'S-CoreDream-3Light',
          fontSize: '18px',
          fontWeight: 600,
          lineHeight: 1.6,
          letterSpacing: '0.36px',
        },
        '.score-bold16': {
          fontFamily: 'S-CoreDream-3Light',
          fontSize: '16px',
          fontWeight: 600,
          lineHeight: '26px',
          letterSpacing: '0.02em',
        },
        '.score-medium20': {
          fontFamily: 'S-CoreDream-3Light',
          fontSize: '20px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: 1.6,
          letterSpacing: '0.4px',
        },
        '.score-medium16': {
          fontFamily: 'S-CoreDream-3Light',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: 1.6,
          letterSpacing: '0.32px',
        },
        '.score-medium14': {
          fontFamily: 'S-CoreDream-3Light',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: 1.6,
          letterSpacing: '0.28px',
        },
        '.score-medium12': {
          fontFamily: 'S-CoreDream-3Light',
          fontSize: '12px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: 'normal',
          letterSpacing: '0.24px',
        },
        '.score-regular16': {
          fontFamily: 'S-CoreDream-3Light',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: 200,
          lineHeight: 1.6,
          letterSpacing: '0.32px',
        },
        '.score-regular12': {
          fontFamily: 'S-CoreDream-3Light',
          fontSize: '12px',
          fontStyle: 'normal',
          fontWeight: 200,
          lineHeight: 'normal',
          letterSpacing: '0.6px',
        },

        /* Noto Sans KR' */
        '.notosans-bold16': {
          fontFamily: 'Noto Sans KR',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: 1.6,
          letterSpacing: '0.32px',
        },
        '.notosans-medium16': {
          fontFamily: 'Noto Sans KR',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: 1.6,
          letterSpacing: '0.32px',
        },
        '.notosans-medium14': {
          fontFamily: 'Noto Sans KR',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: 1.6,
          letterSpacing: '0.28px',
        },
        '.notosans-medium12': {
          fontFamily: 'Noto Sans KR',
          fontSize: '12px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: 1.6,
          letterSpacing: '0.24px',
        },
        '.notosans-regular16': {
          fontFamily: 'Noto Sans KR',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: 1.6,
          letterSpacing: '0.32px',
        },
        '.notosans-regular14': {
          fontFamily: 'Noto Sans KR',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: 1.6,
          letterSpacing: '0.28px',
        },
        '.notosans-regular12': {
          fontFamily: 'Noto Sans KR',
          fontSize: '12px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: 1.6,
          letterSpacing: '0.24px',
        },
      });
    },
    ({ addComponents }) => {
      addComponents({
        '.hide-scroll::-webkit-scrollbar': {
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          overflowY: 'scroll',
          display: 'none',
        },

        /* progress bar */
        '.rateProgress::-webkit-progress-bar': {
          background: '#fff6ee',
          borderRadius: '8px',
          height: '16px',
          width: '120px',
          overflow: 'hidden',
        },
        '.rateProgress::-webkit-progress-value': {
          background: '#f57f17',
          height: '16px',
        },
        '.resultsProgress::-webkit-progress-bar': {
          background: '#fff',
          borderRadius: '10px',
          border: '1px solid #cecece',
          overflow: 'hidden',
        },
        '.resultsProgress::-webkit-progress-value': { background: '#cecece' },
        '.resultsProgress_voted::-webkit-progress-value': {
          background: '#ffca9c',
        },
      });
    },
  ],
};
