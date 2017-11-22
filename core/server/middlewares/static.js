/**
 * 静态文件请求处理
 */
const compose = require('koa-compose')
const mount = require('koa-mount')
const serve = require('koa-static')
const favicon = require('koa-favicon')

module.exports = app => {
  const statics = []
  const maxage = 7 * 24 * 60 * 60 * 1000

  // favicon
  statics.push(favicon(app.config.paths.static + '/favicon.ico'))

  // upload directory
  statics.push(mount('/uploads', serve(app.config.paths.uploads, { maxage })))

  return compose(statics)
}
