// import packages
const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const admin = require('./src/shared/wedn')

// options
const config = {
  env: process.env.NODE_ENV || 'development',
  paths: {
    root: __dirname,
    source: path.join(__dirname, 'src', 'client'),
    static: path.join(__dirname, 'src', 'client', 'static'),
    output: path.join(__dirname, 'dist', admin.output),
    publicPath: admin.base, // admin prefix
    assets: 'assets',
    index: path.join(__dirname, 'dist/server/views/admin/index.html')
  },
  server: {
    port: process.env.PORT || 2081,
    proxy: {
      '/api': {
        target: 'http://localhost:2080/',
        changeOrigin: true,
        secure: false
      }
    }
  },
  sourceMap: { js: true, css: true }
}

const isProd = config.env === 'production'

// # ===== utils function =====
const assetPath = (...paths) => {
  return path.posix.join(config.paths.assets, ...paths)
}

const styleLoader = (type) => {
  if (config.env !== 'production') {
    return `style-loader!${(type === 'css' ? '' : 'css-loader!')}${type}-loader`
  }
  return ExtractTextPlugin.extract({
    fallbackLoader: 'style-loader',
    loader: (type === 'css' ? [] : ['css-loader']).concat([
      { loader: `${type}-loader`, options: { sourceMap: config.sourceMap.css } }
    ])
  })
}

// # ===== webpack config =====
module.exports = {
  context: config.paths.root,
  entry: {
    main: [path.join(config.paths.source, 'main.js')]
  },
  output: {
    path: config.paths.output,
    filename: isProd ? assetPath('js', '[name].js?v=[chunkhash:6]') : '[name].js',
    publicPath: config.paths.publicPath,
    libraryTarget: 'umd',
    chunkFilename: isProd ? assetPath('js', '[name].[chunkhash:6].js') : '[name].[chunkhash:6].js',
    // // source map not work
    // devtoolModuleFilenameTemplate: 'wedn',
    sourceMapFilename: '[file].map'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter')
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
      // runtime-only build, template option is not available.
      'vue$': 'vue/dist/vue.common'
    }
  },
  devServer: {
    port: config.server.port,
    proxy: config.server.proxy,
    contentBase: config.paths.static,
    publicPath: config.paths.publicPath,
    historyApiFallback: {
      index: config.paths.publicPath
    },
    noInfo: true,
    // no default console
    quiet: true,
    lazy: false,
    inline: true,
    hot: true
  },
  performance: {
    hints: false,
    maxAssetSize: 1 * 1024 * 1000,
    maxEntrypointSize: 2 * 1024 * 1000,
    assetFilter: name => name.endsWith('.css') || name.endsWith('.js')
  },
  devtool: 'eval-source-map', // ???? eval-source-map
  target: 'web',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(config.env),
        ADMIN_BASE: JSON.stringify(config.paths.publicPath)
      }
    }),
    new HtmlWebpackPlugin({
      title: 'WEDN.NET',
      filename: isProd ? config.paths.index : 'index.html',
      template: path.join(config.paths.source, 'index.ejs'),
      inject: false,
      minify: isProd ? {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      } : false
    })
  ]
}

if (isProd) {
  module.exports.devtool = config.sourceMap.js ? 'source-map' : false
  module.exports.plugins = (module.exports.plugins || []).concat([
    new ExtractTextPlugin(assetPath('css', '[name].css?v=[hash:6]')),
    new CopyWebpackPlugin([
      { from: config.paths.static, context: __dirname }
    ]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: m => m.resource && /\.js$/.test(m.resource) && m.resource.includes('node_modules')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      comments: false,
      sourceMap: true
    }),
    new webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: true
    }),
    new webpack.BannerPlugin('Copyright (c) WEDN.NET')
  ])
} else {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new FriendlyErrorsPlugin()
  ])
}
