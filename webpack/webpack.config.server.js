const path = require('path');
const nodeExternals = require('webpack-node-externals');
const commonConfig = require('./webpack.config');

const root = process.cwd();

module.exports = {
  ...commonConfig,
  mode: 'development',
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  entry: ['regenerator-runtime/runtime.js', './src/server.js'],
  output: {
    ...commonConfig.output,
    path: path.join(root, 'build'),
  },
};
