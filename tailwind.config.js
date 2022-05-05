const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,css}'],
  theme: {
    screens: {
      xs: '400px',
      ...defaultTheme.screens,
    },
    fontSize: {
      xxs: '0.6rem',
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
      '10xl': ['9rem', { lineHeight: '1.1' }],
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
