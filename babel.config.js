// const { NODE_ENV } = process.env;

const plugins = [
  [
    '@babel/plugin-proposal-class-properties',
    {
      loose: true,
    },
  ],
];

// if (NODE_ENV !== 'production') {
//   plugins.push('react-refresh/babel');
// }

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
        forceAllTransforms: true,
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ],
  plugins: plugins,
};
