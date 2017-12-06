/**
 * 请求响应标头
 */
module.exports = app => async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('Server', 'WEDN.NET')
  ctx.set('X-Power-By', 'WEDN.NET')
  ctx.set('X-Response-Time', `${ms}ms`)
  ctx.set('X-Robots-Tag', 'noindex, nofollow')
}
