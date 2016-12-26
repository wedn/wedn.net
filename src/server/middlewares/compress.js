// 压缩响应流处理
import { Z_SYNC_FLUSH } from 'zlib'
import compress from 'koa-compress'

export default app =>
  app.config.compress
  ? compress({
    filter: type => !/image/i.test(type),
    threshold: 1024 * 50,
    flush: Z_SYNC_FLUSH
  })
  : (ctx, next) => next()
