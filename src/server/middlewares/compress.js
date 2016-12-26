/**
 * 压缩响应流处理
 * Manually turning compression on and off
 * `ctx.compress = false`
 */
import { Z_SYNC_FLUSH } from 'zlib'
import compress from 'koa-compress'

export default app => {
  const config = app.config.compress
  if (!config) return (ctx, next) => next()
  return compress({
    filter: type => config.filter.test(type),
    threshold: config.threshold,
    flush: Z_SYNC_FLUSH
  })
}
