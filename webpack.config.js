/**
 * 
 * webpack 4.0 配置文件
 * @time 2019-03-28
 */

const path = require('path')
const CleanPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const extractSass = new ExtractTextPlugin({
    filename: "nayo.min.css"
});


module.exports = {
    mode: 'development',
    entry: './src/scripts/main.js',
    output: {
        path: path.resolve(__dirname, 'source'),
        filename: 'nayo.bundle.js'
    },
    module: {
        rules: [{
            // ES6 
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: "babel-loader"
            }
        }, {
            // scss、sass
            test: /\.(sass|scss)$/,
            use: extractSass.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'postcss-loader', 'sass-loader']
            })
        },  {
            // 图片
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    name: 'img/[name].[hash:4].[ext]',
                    limit: 1024
                }
            }]
        }, {
            // 字体,图标文件
            test: /\.(woff|svg|eot|ttf)\??.*$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: 'fonts/[name].[hash:2].[ext]',
                    limit: 8192
                }
            }
        }]
    },
    plugins: [       
        new OptimizeCssAssetsPlugin(),
        extractSass
    ],
    resolve: {
        alias: {
            '@scripts': path.resolve(__dirname, 'src/scripts/'),
            '@styles': path.resolve(__dirname, 'src/styles/')
        }
    }
}