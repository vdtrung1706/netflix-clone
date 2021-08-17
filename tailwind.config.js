const themes = require('./tailwind-config/themes');
const variants = require('./tailwind-config/variants');

module.exports = {
  purge: ['./src/**/*.html', './src/**/*.jsx', './src/**/*.js'],
  darkMode: false,
  theme: {
    extend: {
      ...themes,
    },
  },
  variants: {
    extend: {
      ...variants,
    },
  },
  plugins: [],
};
