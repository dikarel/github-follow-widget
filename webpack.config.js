const { resolve } = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  devtool: 'source-map',

  devServer: {
    contentBase: resolve(__dirname, 'public'),
    publicPath: '/',
    open: true
  },

  externals: {
    'js-sorted-set': 'SortedSet',
    'react-dom': 'ReactDOM',
    'whatwg-fetch': 'fetch',
    'bluebird': 'Promise',
    'immutable': 'Immutable',
    'react': 'React'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [['es2015', { 'modules': false }],
            'react']
        }
      }
    ]
  }
}
