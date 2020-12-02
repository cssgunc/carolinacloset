const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './frontend/index.js',
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
  devServer: {
    host: 'localhost',
    port: 3000,
    proxy: {
      '^/api/*': {
        target: 'https://localhost:8080/api/',
        secure: false,
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
        template: './frontend/public/index.html'
    })
  ]
};