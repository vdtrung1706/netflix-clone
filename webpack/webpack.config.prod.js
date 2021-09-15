const commonConfig = require('./webpack.config');

module.exports = {
  ...commonConfig,
  mode: 'production',
  target: 'browserslist',
  devtool: 'source-map',
  entry: ['@babel/polyfill', './src/client.js'],
};
