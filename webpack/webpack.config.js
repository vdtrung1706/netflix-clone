const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const root = process.cwd();
const NODE_MODULES = path.join(root, 'node_modules');

module.exports = {
  output: {
    path: path.join(root, 'dist'),
    filename: 'index.bundle.js',
    assetModuleFilename: 'images/[hash][ext][query]',
    publicPath: '/',
  },
  entry: ['regenerator-runtime/runtime.js', './src/index.js'],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', 'scss'],
    alias: {
      '@components': path.join(root, 'src/components'),
      '@services': path.join(root, 'src/services'),
      '@store': path.join(root, 'src/store'),
      '@utils': path.join(root, 'src/utils'),
      '@hooks': path.join(root, 'src/hooks'),
      '@assets': path.join(root, 'src/assets'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: path.join(root, 'src/index.html'),
      inject: 'body',
      favicon: path.join(root, 'src/assets/icons/netflix_logo_n.ico'),
    }),
    new Dotenv({
      path: path.join(root, '.env'),
      safe: false,
    }),
  ],
  module: {
    rules: [
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
    ],
  },
};
