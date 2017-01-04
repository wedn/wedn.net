/**
 * 整合全部中间件
 */
import convert from 'koa-convert'
import compose from 'koa-compose'
// # Load all of the middlewares
import logger from './logger'
import header from './header'
import error from './error'
import compress from './compress'
import serve from './static'
import url from './url'
import body from './body'
import view from './view'
import mailer from './mailer'
import session from './session'
import passport from './passport'
import router from './router'

export default app => {
  // ## 中间件列表
  const middlewares = []

  // ## 选项注入
  app.context.options = app.options

  // ## 开发模式时记录日志
  middlewares.push(logger(app))

  // ## 自定义响应头
  middlewares.push(header(app))

  // ## 错误处理
  middlewares.push(error(app))

  // ## 压缩响应流处理
  middlewares.push(compress(app))

  // ## 静态资源
  middlewares.push(serve(app))

  // ## URL friendly
  middlewares.push(url(app))

  // ## 请求体格式化处理
  middlewares.push(body(app))

  // ## 视图模板引擎
  middlewares.push(view(app))

  // ## 邮件系统
  middlewares.push(mailer(app))

  // ## 会话支持
  middlewares.push(session(app))

  // ## 账户校验
  middlewares.push(passport(app))

  // ## 自动化路由
  middlewares.push(router(app))

  // ## 合并导出
  return compose(middlewares.map(item => {
    // ### 转换部分 Generator Function Middlewares
    // > 兼容 1.x Koa middleware
    return item.constructor.name === 'Function' ? item : convert(item)
  }))
}

// 由于需要控制中间件顺序，所以不能自动加载
// /**
//  * 整合全部中间件
//  */
// import glob from 'glob'
// import convert from 'koa-convert'
// import compose from 'koa-compose'

// export default app => {
//   // ## 中间件列表
//   const middlewares = glob
//     .sync('./*.js', { cwd: __dirname, ignore: './index.js' })
//     .map(require)
//     .map(item => item.default(app)) // es6 module default

//   // ## 选项注入
//   app.context.options = app.options

//   // ## 合并导出
//   return compose(middlewares.map(item => {
//     // ### 转换部分 Generator Function Middlewares
//     // > 兼容 1.x Koa middleware
//     return item.constructor.name === 'Function' ? item : convert(item)
//   }))
// }
