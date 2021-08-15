const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

let mode = 'development';
let target = 'web';
const plugins = [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin(),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './src/index.html'),
  }),
];

if (process.env.NODE_ENV === 'producttion') {
  mode = 'producttion';
  target = 'browserslist';
}

if (process.env.SERVE) {
  // We only want React Hot Reloading in serve mode
  plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
  mode: mode,
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'index.bundle.js',
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  devServer: {
    port: 3000,
    contentBase: path.resolve(__dirname, './dist'),
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          'eslint-loader',
        ],
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '' },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        /**
         * The `type` setting replaces the need for "url-loader"
         * and "file-loader" in Webpack 5.
         *
         * setting `type` to "asset" will automatically pick between
         * outputing images to a file, or inlining them in the bundle as base64
         * with a default max inline size of 8kb
         */
        type: 'asset',
        /**
         * If want to inline larger images, you can set
         * a custom `maxSize` for inline like so:
         */
        // parser: {
        //   dataUrlCondition: {
        //     maxSize: 30 * 1024,
        //   },
        // },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: plugins,
  target: target,
  devtool: 'source-map',
};
