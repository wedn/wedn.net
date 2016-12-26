/**
 * 静态文件请求处理
 */
import path from 'path'
import compose from 'koa-compose'
import mount from 'koa-mount'
import serve from 'koa-static'
import favicon from 'koa-favicon'

export default (options) => {
  const statics = []
  const maxage = 7 * 24 * 60 * 60 * 1000

  // favicon
  statics.push(favicon(options.paths.static + '/favicon.ico'))

  // upload directory
  statics.push(mount('/uploads', serve(options.paths.upload, { maxage })))

  // // theme assets directory
  // statics.push(mount('/assets', serve(options.paths.upload, { maxage })))

  // static directory
  statics.push(mount('/', serve(options.paths.static, { maxage })))

  // client admin
  if (process.env.NODE_ENV === 'production') {
    statics.push(mount('/admin', serve(path.join(__dirname, '../../client'), { maxage })))
  } else {
    statics.push(mount('/node_modules', serve(path.join(__dirname, '../../../node_modules'), { maxage })))
  }

  return compose(statics)
}
