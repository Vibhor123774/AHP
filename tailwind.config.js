const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
const withMT = require('@material-tailwind/react/utils/withMT')

module.exports = withMT({
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        trueGray: colors.neutral
      },
      keyframes: {
        fadeDown: {
          '0%': { transform: 'translate3d(0,-20%,0)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
      animation: {
        'hero-fade-down': 'fadeDown 1s ease-in both'
      }
    },
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
      stock: [defaultTheme.fontFamily.sans]
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
})
