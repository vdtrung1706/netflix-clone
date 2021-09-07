const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const nodeUtils = require('./src/services/node.service');

const NODE_MODULES = path.join(__dirname, 'node_modules');
const isDevelopment = nodeUtils.isDevelopment();

/**
 * Get webpack plugins
 * @returns *[]
 */
function getPlugins() {
  return [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      inject: 'body',
      favicon: path.resolve(__dirname, './src/assets/icons/netflix_logo_n.ico'),
    }),
    new Dotenv({
      path: path.resolve(__dirname, './.env'),
      safe: false,
    }),
  ];
}

/**
 * Get rules
 * @returns []
 */
function getParserRules() {
  return [
    {
      test: /\.(sa|sc|c)ss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: { publicPath: '' },
        },
        'css-loader',
        'postcss-loader',
        'sass-loader',
      ],
    },
    {
      test: /\.(js|jsx)$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      ],
      exclude: NODE_MODULES,
    },
    {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
      type: 'asset',
    },
    {
      test: /\.ico$/,
      use: 'file-loader?name=[name].[ext]',
    },
    {
      test: /\.json$/,
      use: 'json-loader',
    },
  ];
}

// Webpack config
const webpackConfig = {
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'index.bundle.js',
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  entry: ['regenerator-runtime/runtime.js', './src/index.js'],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', 'scss'],
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@services': path.resolve(__dirname, './src/services'),
      '@store': path.resolve(__dirname, './src/store'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  plugins: getPlugins(),
  module: {
    rules: getParserRules(),
  },
};

/**
 * Add additional configurations based on NODE_ENV
 */
if (nodeUtils.isProduction()) {
  webpackConfig.mode = 'production';
  webpackConfig.target = 'browserslist';
  webpackConfig.devtool = 'source-map';
} else {
  webpackConfig.target = 'web';
  webpackConfig.mode = 'development';
  webpackConfig.plugins.push(new ReactRefreshWebpackPlugin());

  webpackConfig.devServer = {
    port: 3000,
    hot: true,
    contentBase: './dist',
  };

  webpackConfig.devtool = 'eval-cheap-source-map';
}

module.exports = webpackConfig;
