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

      /* S-CoreDream-3Light */
      scoreheader: {
        fontFamily: 'S-Core Dream',
        fontSize: '24px',
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 'normal',
        letterSpacing: '-0.36px',
      },
      scoretitle1: {
        fontFamily: 'S-Core Dream',
        fontSize: '22px',
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 'normal',
        letterSpacing: '-0.315px',
      },
      scoretitle2: {
        fontFamily: 'S-Core Dream',
        fontSize: '18px',
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 'normal',
        letterSpacing: '-0.27px',
      },
      scorebody1: {
        fontFamily: 'S-Core Dream',
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 'normal',
        letterSpacing: '-0.24px',
      },
      scorebody2: {
        fontFamily: 'S-Core Dream',
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 'normal',
        letterSpacing: '-0.21px',
      },
      scorecaption: {
        fontFamily: 'S-Core Dream',
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: '200',
        lineHeight: 'normal',
        letterSpacing: '-0.21px',
      },

      /* Noto Sans KR */
      notosansheader: {
        fontFamily: 'Noto Sans KR',
        fontSize: '24px',
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 'normal',
        letterSpacing: '-0.36px',
      },
      notosanstitle1: {
        fontFamily: 'Noto Sans KR',
        fontSize: '22px',
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 'normal',
        letterSpacing: '-0.315px',
      },
      notosanstitle2: {
        fontFamily: 'Noto Sans KR',
        fontSize: '18px',
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 'normal',
        letterSpacing: '-0.27px',
      },
      notosansbody1: {
        fontFamily: 'Noto Sans KR',
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 'normal',
        letterSpacing: '-0.24px',
      },
      notosansbody2: {
        fontFamily: 'Noto Sans KR',
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 'normal',
        letterSpacing: '-0.21px',
      },
      notosanscaption: {
        fontFamily: 'Noto Sans KR',
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: '200',
        lineHeight: 'normal',
        letterSpacing: '-0.21px',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [],
  },
};
