import logger from 'koa-logger'

export default config =>
  config.app.env !== 'development'
  ? logger()
  : (ctx, next) => next()
