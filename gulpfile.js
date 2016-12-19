const gulp = require('gulp')
const loadPlugins = require('gulp-load-plugins')
const del = require('del')

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const webpackConfig = require('./webpack.config')

const plugins = loadPlugins()

// ======================================================
// ======================= Tasks ========================
// ======================================================

/**
 * Code lint
 */
gulp.task('lint', () => {
  return gulp.src(['gulpfile.js', 'src/**/*.js', 'src/**/*.vue'])
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format('node_modules/eslint-friendly-formatter'))
    .pipe(plugins.eslint.failAfterError())
})

/**
 * Clean temp files
 */
gulp.task('clean', [], del.bind(null, ['dist']))

/**
 * Clean node_modules
 */
gulp.task('clean:npm', [], del.bind(null, ['node_modules']))

/**
 * Build client side application
 */
gulp.task('build:client', callback => {
  process.env.BABEL_ENV = 'client'
  webpack(webpackConfig, (error, stats) => {
    if (error) throw new plugins.util.PluginError('webpack', error)
    // plugins.util.log('[webpack]', stats.toString({ colors: true }))
    callback()
  })
})

/**
 * Build server side application
 */
gulp.task('build:server', () => {
  process.env.BABEL_ENV = 'server'
  return gulp.src('src/server/**/*.*')
    .pipe(plugins.if('*.js', plugins.babel()))
    .pipe(gulp.dest('dist/server'))
})

/**
 * Build all
 */
gulp.task('build', ['clean'], () => gulp.start('build:client', 'build:server'))

/**
 * Run client
 */
gulp.task('run:client', callback => {
  process.env.BABEL_ENV = 'client'
  // hot module replace
  webpackConfig.entry.main.unshift(
    // 不填写服务地址默认就是当前域
    // 'webpack-dev-server/client?http://localhost:2080/',
    'webpack-dev-server/client',
    'webpack/hot/dev-server'
  )
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())

  const server = new WebpackDevServer(webpack(webpackConfig), webpackConfig.devServer)

  server.listen(webpackConfig.devServer.port, error => {
    if (error) throw new plugins.util.PluginError('run:client', error)
    plugins.util.log('[run:client]', `@ http://localhost:${webpackConfig.devServer.port}/`)
    // keep the server alive or continue?
    // callback()
  })
})

/**
 * Run server
 */
gulp.task('run:server', () => {
  process.env.BABEL_ENV = 'server'
  plugins.nodemon({
    script: 'src/server',
    exec: './node_modules/.bin/babel-node',
    watch: ['src/server']
  })
})

/**
 * Run all
 */
gulp.task('run:all', () => gulp.start('run:client', 'run:server'))
