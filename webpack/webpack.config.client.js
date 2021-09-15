const commonConfig = require('./webpack.config');

module.exports = {
  ...commonConfig,
  mode: 'development',
  entry: ['regenerator-runtime/runtime.js', './src/client.js'],
};
