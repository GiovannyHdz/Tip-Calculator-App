const { guessProductionMode } = require("@ngneat/tailwind");

module.exports = {
    prefix: '',
    purge: {
      enabled: guessProductionMode(),
      content: [
        './src/**/*.{html,ts}',
      ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      extend: {
        fontFamily: {
          'sans': ['Space Mono']
        },
        screens: {
          'xs': '375px'
        },
        colors: {
         'strong-cyan':         'hsl(172, 67%, 45%)',
         'very-dark-cyan':      'hsl(183, 100%, 15%)',
         'dark-grayish-cyan':   'hsl(186, 14%, 43%)',
         'dark-grayish-cyan-2': 'hsl(184, 14%, 56%)',
         'light-grayish-cyan':  'hsl(185, 41%, 84%)',
         'white-cyan':          'hsl(0, 0%, 100%)',
        },
        letterSpacing: {
         'widest-2': '.50em',
        }
      },
    },
    variants: {
      extend: {},
    },
    plugins: [require('@tailwindcss/forms'),require('@tailwindcss/typography')],
};
