  // 静态文件请求处理
  // middlewares.push(statics(config.paths.content, { maxage: 7 * 24 * 60 * 60 * 1000 }))
// import path from 'path'
import compose from 'koa-compose'
import mount from 'koa-mount'
import serveStatic from 'koa-static'

export default (options) => {
  const statics = []

  statics.push(mount('/assets', serveStatic(options.paths.asset, { maxage: 7 * 24 * 60 * 60 * 1000 })))
  statics.push(mount('/uploads', serveStatic(options.paths.upload, { maxage: 7 * 24 * 60 * 60 * 1000 })))

  return compose(statics)
}