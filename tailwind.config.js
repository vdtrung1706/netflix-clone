const themes = require('./themes');
const variants = require('./themes/variants');

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
