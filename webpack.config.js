var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/app.js')
  },
  output: {
    path: path.resolve(__dirname, 'app/dist/js/'),
    filename: '[name]-built.js'
  },
  resolve: {
    modulesDirectories: ["src", "node_modules"]
  },
  node: {
    fs: 'empty'
  },
  devtool: 'source-map',
 
  // Add loader for .ts files. 
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss|\.css$/,
        loader: ExtractTextPlugin.extract('raw-loader!postcss-loader!sass-loader') 
      },
      {
        test: /\.html$/,
        loader: 'mustache-loader?rootRelative='
      },
      {
        test: /\.js?$/,
        exclude: /(node_modules|lib)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  postcss: function () {
    return [ 
      autoprefixer({ browsers: 'last 20 versions', remove: false })
    ]
  },
  plugins: [
    new ExtractTextPlugin('../css/[name]-built.css', { allChunks: true } )
  ]
};