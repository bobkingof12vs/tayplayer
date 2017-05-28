//https://webpack.js.org/guides/code-splitting-libraries/
//https://webpack.js.org/guides/caching/

var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var InlineChunkWebpackPlugin = require('html-webpack-inline-chunk-plugin');

module.exports = {
    entry: [
        "babel-polyfill",
        '.\\app\\index.js'
    ],
    output: {
        path: __dirname,
        filename: 'build/[name].js',
        chunkFilename: 'build/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['babel-preset-es2015', 'babel-preset-react'].map(require.resolve),
                    plugins: ['babel-plugin-transform-object-rest-spread'].map(require.resolve)
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
               // this assumes your vendor imports exist in the node_modules directory
               return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        new HtmlWebpackPlugin({
          template: './index.ejs',
          filename: path.join(__dirname, 'index.html')
        }),
        new InlineChunkWebpackPlugin()
    ],
    devtool: '#source-map'
};
