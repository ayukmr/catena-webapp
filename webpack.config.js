const webpack = require('webpack');
const path    = require('path');

module.exports = {
  entry: './src/index.js',

  devServer: {
    static: './dist'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  plugins: [
    new webpack.ProvidePlugin({ m: 'mithril' })
  ],

  module: {
    rules: [{
      test: /\.less$/i,
      use: [
        'style-loader',
        'css-loader',
        'less-loader'
      ]
    }]
  }
};
