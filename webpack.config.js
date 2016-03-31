'use strict';
const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
console.log(NODE_ENV);
module.exports = {
  entry: path.resolve(__dirname, "app", "main", "index.js"),
  output: {
    path: path.resolve(__dirname , "build"),
    filename: "app.js",
    publicPath : '/'
  },

  devtool : NODE_ENV == 'development' ? 'source-map' : null,

  plugins : [
    new webpack.DefinePlugin({NODE_ENV : JSON.stringify(NODE_ENV)}),
    new webpack.NoErrorsPlugin(),
  ],

  module: {
    loaders: [
      {
        test: /\.js?$/,
        include: path.resolve(__dirname , "app"),
        loader: 'babel?presets[]=es2015,plugins[]=transform-runtime'
      },
      {
        test: /\.html/,
        loader: "html",
        include : path.resolve(__dirname , "app"),
      },
      {
        test : /\.css$/,
        loader : 'style!css',
      },
      {
        test : /\.less$/,
        loader : 'style!css!less',
      },
      {
        test : /\.(jpg|png|svg|ttf|eot|woff|woff2|gif)$/,
        loader : 'file?name=[path]/[name].[ext]?[hash]',
      },
    ],
    noParse : /angular\/angular.js/
  },

  devServer : {
    host : 'localhost',
    port : '3001',
    contentBase : path.resolve(__dirname , "build"),
    //перенапрвляем запросы
    proxy : require('./proxy_dev'),
    historyApiFallback : true // Для singePage

  }
};

if (NODE_ENV == 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress : {
        warnings : false,
        drop_console : true,
        unsafe : true
      }
    })
  )
}