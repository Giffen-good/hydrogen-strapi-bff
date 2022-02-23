const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,css}'],
  theme: {
    screens: {
      xs: '400px',
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        sans: ['NeuzeitBook', 'sans-serif'],
        semibold: ['NeuzeitBookHeavy', 'sans-serif'],
        serif: ['BFF'],
      },
      fontWeight: {
        semibold: '400',
      },
      spacing: {
        128: '32rem',
      },
      gridTemplateColumns: {
        'alpha-4': ' repeat(4, minmax(56px, 0))',
        'alpha-3': ' repeat(3, minmax(56px, 0))',
      },
      screens: {},
      colors: {
        yellow: {
          bff: '#E8D466',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            hr: {
              borderColor: theme('colors.gray.200'),
              borderTopWidth: '1px',
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            'ol > li::before': {
              color: theme('colors.gray.900'),
            },
            'ul > li::before': {
              backgroundColor: theme('colors.gray.900'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
};
