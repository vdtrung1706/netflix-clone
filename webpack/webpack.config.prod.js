const commonConfig = require('./webpack.config');

module.exports = {
  ...commonConfig,
  mode: 'production',
  target: 'browserslist',
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      chunks: 'async',
      cacheGroups: {
        default: {
          minChunks: 2,
          reuseExistingChunk: true,
        },
        vendor_react: {
          test: /.*\/node_modules\/react\/index\.js/,
          name: 'vendor-react',
          chunks: 'initial',
          enforce: true,
        },
      },
    },
  },
};
