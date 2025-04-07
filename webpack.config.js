const path = require('path');

const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
  ...defaultConfig,
  entry: {
    ...defaultConfig.entry(),
    styleguide: path.resolve(__dirname, './src/js/styleguide.js'),
  },
  resolve: {
    ...defaultConfig.resolve,
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@plugins': path.resolve(__dirname, './src/plugins'),
    },
  },
  module: {
    ...defaultConfig.module,
    rules: [
      ...defaultConfig.module.rules,
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
    ],
  },
};
