 const path = require('path'),
     webpack = require('webpack'),
     ExtractTextPlugin = require('extract-text-webpack-plugin'),
     CleanPlugin = require('clean-webpack-plugin');

 module.exports = {
     entry: {
         main: './src/scripts/main.js'
     },
     output: {
         path: path.resolve(__dirname, 'source'),
         filename: 'nayo.bundle.js'
     },
     module: {
         rules: [{
                 test: require.resolve('./src/scripts/jquery'),
                 use: [{
                     loader: 'expose-loader',
                     options: '$'
                 }]
             },
             {
                 test: /\.js$/,
                 use: {
                     loader: 'babel-loader',
                     options: {
                         presets: ['es2015']
                     }
                 },
                 exclude: /node_modules/
             },
             {
                 test: /\.(styl|css)$/,
                 use: ExtractTextPlugin.extract({
                     fallback: 'style-loader',
                     use: [{
                             loader: 'css-loader',
                             options: {
                                 importLoaders: 2,
                                 minimize: true
                             }
                         },
                         {
                             loader: 'postcss-loader',
                             options: {
                                 plugins: [require("autoprefixer")({
                                     browsers: ['last 5 versions']
                                 })]
                             }
                         },
                         'stylus-loader'
                     ]
                 })
             },
             {
                 test: /\.(png|jpg|gif)$/,
                 use: [{
                     loader: 'url-loader',
                     options: {
                         name: 'img/[name].[hash:4].[ext]',
                         limit: 1024
                     }
                 }]
             },
             {
                 test: /\.(woff|svg|eot|ttf)\??.*$/,
                 use: {
                     loader: 'file-loader',
                     options: {
                         name: 'fonts/[name].[hash:4].[ext]'
                     }
                 }
             }
         ]
     },
     plugins: [
         new ExtractTextPlugin('nayo.min.css'),
         new CleanPlugin('./source', {
            // 一般图标不需要清空
            exclude: ['images', 'fonts']
            // exclude: ['images']
         }),
         new webpack.optimize.OccurrenceOrderPlugin(),
         new webpack.optimize.UglifyJsPlugin()
     ]
 }