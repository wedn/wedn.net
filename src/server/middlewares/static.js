// 静态文件请求处理
// middlewares.push(statics(config.paths.content, { maxage: 7 * 24 * 60 * 60 * 1000 }))
import path from 'path'
import compose from 'koa-compose'
import mount from 'koa-mount'
import serve from 'koa-static'

export default (options) => {
  const statics = []

  // upload directory
  statics.push(mount('/uploads', serve(options.paths.upload, { maxage: 7 * 24 * 60 * 60 * 1000 })))
  // theme assets directory
  // statics.push(mount('/uploads', serve(options.paths.upload, { maxage: 7 * 24 * 60 * 60 * 1000 })))
  // static directory
  statics.push(mount('/', serve(options.paths.static, { maxage: 7 * 24 * 60 * 60 * 1000 })))

  // client admin
  if (process.env.NODE_ENV === 'production') {
    statics.push(mount('/admin', serve(path.join(__dirname, '../../client/'), { maxage: 7 * 24 * 60 * 60 * 1000 })))
  }

  return compose(statics)
}
