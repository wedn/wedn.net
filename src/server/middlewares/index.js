/**
 * 整合常用中间件
 */
import compose from 'koa-compose'
// Load all of the middlewares
import logger from './logger'
import header from './header'
import error from './error'
import compress from './compress'
import serve from './static'
import url from './url'
import body from './body'
import session from './session'
import passport from './passport'
import view from './view'
import mailer from './mailer'
import router from './router'

export default app => {
  // options
  app.context.options = app.config.options

  const middlewares = []

  // 开发模式时记录日志
  middlewares.push(logger(app))

  // 自定义响应头
  middlewares.push(header(app))

  // 错误处理
  middlewares.push(error(app))

  // 压缩响应流处理
  middlewares.push(compress(app))

  // 静态资源
  middlewares.push(serve(app))

  // URL friendly
  middlewares.push(url(app))

  // 请求体格式化处理
  middlewares.push(body(app))

  // 会话支持
  middlewares.push(session(app))

  // 账户校验
  middlewares.push(passport(app))

  // 视图模板引擎
  middlewares.push(view(app))

  // 邮件系统
  middlewares.push(mailer(app))

  // 自动化路由
  middlewares.push(router())

  // // 转换部分Generator Function Middlewares
  // middlewares.forEach(m => console.log(m.constructor))
  // return compose(middlewares.map(convert))
  return compose(middlewares)
}
