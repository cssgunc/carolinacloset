const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './index2.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'pg-native': path.join(__dirname, 'aliases/pg-native.js'),
    },
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
        template: './public/index.html'
    })
  ]
};