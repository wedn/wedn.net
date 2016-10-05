const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const isProduction = process.env.NODE_ENV === 'production'

const lessLoader = isProduction ? ExtractTextPlugin.extract(['css?sourceMap', 'less']) : 'style!css?sourceMap!less'
const cssLoader = isProduction ? ExtractTextPlugin.extract(['css?sourceMap']) : 'style!css?sourceMap'

const config = module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js?v=[hash:8]',
    path: path.join(__dirname, './dist'),
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.css$/, loader: cssLoader },
      { test: /\.less$/, loader: lessLoader },
      { test: /\.(png|jpg|gif|svg)$/, loader: 'file', query: { name: '[name].[ext]?v=[hash:8]' } },
      { test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, loader: 'url', query: { limit: 10000, name: '[name].[ext]?v=[hash:8]' } }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, './node_modules')],
    extensions: ['.js', '.json', '.vue']
  },
  devtool: '#eval-source-map',
  devServer: {
    contentBase: './dist',
    // 支持 History API
    historyApiFallback: true,
    // noInfo: true,
    port: 3080
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'WEDN.NET',
      template: 'index.ejs'
    }),
    new webpack.LoaderOptionsPlugin({
      vue: {
        loaders: {
          js: 'babel',
          css: cssLoader,
          less: lessLoader
        }
      }
    })
  ]
}

if (isProduction) {
  config.devtool = '#source-map'
  config.plugins = (config.plugins || []).concat([
    new ExtractTextPlugin('style.css?v=[hash:8]'),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' } }),
    new webpack.optimize.UglifyJsPlugin({ comments: false, compress: { warnings: false } }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.BannerPlugin('(c) WEDN.NET')
  ])
}
