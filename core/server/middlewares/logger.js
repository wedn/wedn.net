/**
 * Access logging
 */
const logger = require('koa-logger')

module.exports = app => {
  if (app.env === 'development') return logger()
  return (ctx, next) => next()
}
