export default () => async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  ctx.set('Server', 'WEDN.NET')
  ctx.set('X-Power-By', 'WEDN.NET')
  ctx.set('X-Response-Time', ms + 'ms')
}
