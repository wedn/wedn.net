/**
 * 请求日志记录
 */
import logger from 'koa-logger'

export default app => {
  return logger()
  // if (app.env === 'development') return logger()
  // return (ctx, next) => next()
}
