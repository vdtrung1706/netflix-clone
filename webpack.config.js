const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const nodeUtils = require('./src/services/common/node-service');
const APP_DIR = path.join(__dirname, 'src');
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
      safe: true,
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
          options: {},
        },
        'css-loader',
        'postcss-loader',
        'sass-loader',
      ],
      include: APP_DIR,
      exclude: NODE_MODULES,
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
      include: APP_DIR,
      exclude: NODE_MODULES,
    },
    {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
      use: 'url-loader?limit=10000&name=[name]-[hash].[ext]',
      include: APP_DIR,
      exclude: NODE_MODULES,
    },
    {
      test: /\.ico$/,
      use: 'file-loader?name=[name].[ext]',
      exclude: NODE_MODULES,
    },
    {
      test: /\.json$/,
      use: 'json-loader',
      include: APP_DIR,
      exclude: NODE_MODULES,
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
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', 'scss'],
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
  webpackConfig.entry = './src/index.js';
  webpackConfig.target = 'browserslist';
} else {
  webpackConfig.target = 'web';
  webpackConfig.mode = 'development';
  webpackConfig.entry = ['regenerator-runtime/runtime.js', './src/index.js'];
  webpackConfig.plugins.push(new ReactRefreshWebpackPlugin());

  webpackConfig.devServer = {
    port: 3000,
    hot: true,
    contentBase: './dist',
  };

  // webpackConfig.devtool = 'eval-cheap-source-map';
}

module.exports = webpackConfig;
