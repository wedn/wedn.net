/**
 * 请求日志记录
 */
import logger from 'koa-logger'

export default app => {
  if (app.env === 'development') return logger()
  return (ctx, next) => next()
}
