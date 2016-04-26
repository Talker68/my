'use strict';
const webpack = require('webpack');
const path = require('path');
const config = require('config');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
console.log(NODE_ENV);

let  REQUEST_PREFIX = config.get('requestPrefix');

console.log(REQUEST_PREFIX);

module.exports = {
  entry: path.resolve(__dirname, "app", "main", "index.js"),
  output: {
    path: path.resolve(__dirname , "build"),
    filename: "app.js",
    publicPath : config.get('publicPath')
  },

  devtool : config.get('devtool'),

  plugins : [
    new webpack.DefinePlugin(
      {
        NODE_ENV : JSON.stringify(NODE_ENV),
        REQUEST_PREFIX : JSON.stringify(REQUEST_PREFIX),
      }
    ),
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
        loader : 'style!css!autoprefixer?browsers=last 2 versions',
      },
      {
        test : /\.less$/,
        loader : 'style!css!autoprefixer?browsers=last 2 versions!less',
      },
      {
        test : /\.(jpg|png|svg|ttf|eot|woff|woff2|gif)$/,
        loader : 'file?name=files/[path][name].[ext]?[hash]',
      },
    ],
    noParse : /angular\/angular.js/
  },

  resolve: {
    root: [
      path.resolve('./app'),
    ],
    alias : {
      img : "/images"
    }
  },

  devServer : {
    host : 'localhost',
    port : '3001',
    contentBase : path.resolve(__dirname , "app"),
    //перенапрвляем запросы
    proxy : config.get('proxy'),
    historyApiFallback : true // Для singePage
  }
};

console.log(config.get('proxy'));
// if (NODE_ENV == 'production') {
//   module.exports.plugins.push(
//     new webpack.optimize.UglifyJsPlugin({
//       compress : {
//         warnings : false,
//         drop_console : true,
//         unsafe : true
//       }
//     })
//   )
// }