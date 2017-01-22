const { resolve } = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  devtool: 'inline-source-map',

  devServer: {
    contentBase: resolve(__dirname, 'public'),
    publicPath: '/'
  },

  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', options: { presets: ['react'] } }
    ]
  }
}
