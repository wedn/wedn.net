/**
 * 静态文件请求处理
 */
import path from 'path'
import compose from 'koa-compose'
import mount from 'koa-mount'
import serve from 'koa-static'
import favicon from 'koa-favicon'

export default app => {
  const statics = []
  const maxage = 7 * 24 * 60 * 60 * 1000

  // favicon
  statics.push(favicon(app.config.paths.static + '/favicon.ico'))

  // upload directory
  statics.push(mount('/uploads', serve(app.config.paths.upload, { maxage })))

  // // theme assets directory
  // statics.push(mount('/assets', serve(app.config.paths.upload, { maxage })))

  // static directory
  statics.push(mount('/', serve(app.config.paths.static, { maxage })))

  // node_modules directory
  if (app.env === 'production') {
    statics.push(mount('/node_modules', serve(path.join(__dirname, '../../../node_modules'), { maxage })))
  }

  return compose(statics)
}
