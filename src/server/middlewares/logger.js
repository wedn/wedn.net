import logger from 'koa-logger'

export default app =>
  app.env === 'development'
  ? logger()
  : (ctx, next) => next()
