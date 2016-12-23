// Load all of the middlewares
import compose from 'koa-compose'

import logger from './logger'
import header from './header'
import error from './error'
import compress from './compress'
import serve from './static'
import url from './url'
import body from './body'
import session from './session'
import router from './router'
import view from './view'

export default config => {
  const middlewares = []

  // 开发模式时记录日志
  middlewares.push(logger(config))

  // 自定义响应头
  middlewares.push(header(config))

  // 错误处理
  middlewares.push(error(config))

  // 压缩响应流处理
  middlewares.push(compress(config))

  // 静态资源
  middlewares.push(serve(config))

  // URL friendly
  middlewares.push(url(config))

  // 请求体格式化处理
  middlewares.push(body(config))

  // 会话支持
  middlewares.push(session(config))

  // 视图模板引擎
  middlewares.push(view(config))

  // 自动化路由
  middlewares.push(router())

  // 转换部分Generator Function Middlewares
  // middlewares.forEach(m => console.log(m.constructor))
  // return compose(middlewares.map(convert))
  return compose(middlewares)
}
