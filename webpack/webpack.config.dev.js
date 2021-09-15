const path = require('path');
const commonConfig = require('./webpack.config');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const root = process.cwd();

module.exports = {
  ...commonConfig,
  target: 'web',
  mode: 'development',
  plugins: [...commonConfig.plugins, new ReactRefreshWebpackPlugin()],
  devServer: {
    port: 3000,
    hot: true,
    contentBase: path.join(root, 'dist'),
    historyApiFallback: true,
  },
  devtool: 'eval-cheap-source-map',
};
