module.exports = {
  purge: ['./src/**/*.html', './src/**/*.jsx', './src/**/*.js'],
  darkMode: false,
  theme: {
    extend: {
      maxWidth: {
        'poster-200': '200px',
        'poster-300': '300px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
