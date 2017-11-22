/**
 * Compressed response stream
 *
 * Manually turning compression on and off
 * `ctx.compress = false`
 */
const { Z_SYNC_FLUSH } = require('zlib')
const compress = require('koa-compress')

module.exports = app => {
  const config = app.config.compress
  if (!config) return (ctx, next) => next()
  return compress({
    filter: type => config.filter.test(type),
    threshold: config.threshold,
    flush: Z_SYNC_FLUSH
  })
}
