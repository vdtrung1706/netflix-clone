const themes = require('./tailwind-config/themes');
const variants = require('./tailwind-config/variants');
const plugin = require('tailwindcss/plugin');

const focusedSiblingPlugin = plugin(function ({ addVariant }) {
  addVariant('sibling-focus', ({ container }) => {
    container.walkRules((rule) => {
      rule.selector = `:focus + .sibling-focus\\:${rule.selector.slice(1)}`;
    });
  });
});

module.exports = {
  mode: 'jit',
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
  plugins: [focusedSiblingPlugin],
};
