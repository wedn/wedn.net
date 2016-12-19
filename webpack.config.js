const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// options
const config = require('./config')

const isProd = config.env === 'production'

function assetPath (...paths) {
  return path.posix.join(config.paths.assets, ...paths)
}

function styleLoader (type) {
  if (config.env !== 'production') {
    return `style-loader!${(type === 'css' ? '' : 'css-loader!')}${type}-loader`
  }
  return ExtractTextPlugin.extract({
    fallbackLoader: 'style-loader',
    loader: (type === 'css' ? [] : ['css-loader']).concat([
      {
        loader: `${type}-loader`,
        options: {
          sourceMap: true
        }
      }
    ])
  })
}

module.exports = {
  context: config.paths.root,
  entry: {
    main: [path.join(config.paths.source, 'main.js')]
  },
  output: {
    path: config.paths.output,
    publicPath: config.paths.publicPath,
    filename: isProd ? assetPath('js', '[name].js?v=[chunkhash:6]') : '[name].js',
    chunkFilename: isProd ? assetPath('js', '[name].[chunkhash:6].js') : '[name].[chunkhash:6].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          formatter: require("eslint-friendly-formatter")
        }
      },
      {
        test: /\.vue$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          formatter: require("eslint-friendly-formatter")
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: styleLoader('css'),
            less: styleLoader('less')
          }
        }
      },
      {
        test: /\.css$/,
        loader: styleLoader('css')
      },
      {
        test: /\.less$/,
        loader: styleLoader('less')
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetPath('img', '[name].[ext]?v=[hash:6]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetPath('font', '[name].[ext]?v=[hash:6]')
        }
      }
    ]
  },
  resolve: {
    modules: ['node_modules', config.paths.source],
    extensions: ['.js', '.json', '.vue', '.css', '.less'],
    alias: {
      // $: only module name
      // // runtime-only build, template option is not available.
      // 'vue$': 'vue/dist/vue.common'
      'vue$': 'vue/dist/vue'
    }
  },
  devServer: {
    port: config.server.port,
    proxy: config.server.proxy,
    // outputPath: config.paths.output,
    // publicPath: config.paths.publicPath,
    contentBase: config.paths.output,
    historyApiFallback: true,
    // no default console
    quiet: true,
    inline: true,
    hot: true
  },
  devtool: '#eval-source-map', // 'eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(config.env) }
    }),
    new HtmlWebpackPlugin({
      title: 'WEDN.NET',
      filename: isProd ? config.paths.index : 'index.html',
      template: path.join(config.paths.source, 'index.ejs'),
      inject: false
    }),
    new CopyWebpackPlugin([
      { from: config.paths.static, context: __dirname }
    ])
  ]
}

if (isProd) {
  module.exports.devtool = 'source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new ExtractTextPlugin(assetPath('css', '[name].css?v=[hash:6]')),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      comments: false,
      sourceMap: true
    }),
    new webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: m => m.resource && /\.js$/.test(m.resource) && m.resource.includes('node_modules')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    new webpack.BannerPlugin('Copyright (c) WEDN.NET')
  ])

  // just for gh-pages
  if (config.paths.notfound) {
    module.exports.plugins.push(new HtmlWebpackPlugin({
      title: 'WEDN.NET',
      filename: config.paths.notfound,
      template: path.join(config.paths.source, 'index.ejs'),
      inject: false
    }))
  }
}
