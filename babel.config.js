// Cannot load "react-refresh/babel" in production
const plugins = ['@babel/plugin-proposal-class-properties'];
if (process.env.NODE_ENV !== 'production') {
  plugins.push('react-refresh/babel');
}

module.exports = {
  presets: [
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ],
  plugins: plugins,
};
