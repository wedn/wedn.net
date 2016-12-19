// Load all of the middlewares
import path from 'path'
import { Z_SYNC_FLUSH } from 'zlib'

import convert from 'koa-convert'
import compose from 'koa-compose'
import logger from 'koa-logger'
import compress from 'koa-compress'
import bodyParser from 'koa-bodyparser'
import session from 'koa-session'
import error from 'koa-error'

import serveStatic from './static'
import view from './view'
import route from './route'
import header from './header'

export default (app, config) => {
  const middlewares = []

  // TODO：[Legacy middleware] 错误处理
  middlewares.push(convert(error({
    engine: 'handlebars',
    template: path.join(config.paths.view, 'error.hbs')
  })))

  // 自定义响应头
  middlewares.push(header())

  // 开发模式时记录日志
  app.env === 'development' && middlewares.push(logger())

  // 压缩响应流处理
  config.compress && middlewares.push(compress({
    filter: type => !/image/i.test(type),
    threshold: 1024 * 50,
    flush: Z_SYNC_FLUSH
  }))

  // 静态资源
  middlewares.push(serveStatic(config))

  // 请求体格式化处理
  middlewares.push(bodyParser())

  // TODO：[Legacy middleware] 会话支持
  middlewares.push(convert(session(app)))

  // 视图模板引擎
  middlewares.push(view(config))

  // 自动化路由
  middlewares.push(route())

  // 转换部分Generator Function Middlewares
  // middlewares.forEach(m => console.log(m.constructor))
  // return compose(middlewares.map(convert))
  return compose(middlewares)
}
