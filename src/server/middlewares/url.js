/**
 * 请求URL友好化
 */
export default app => (ctx, next) => {
  if (/[A-Z]/.test(ctx.request.url)) {
    ctx.status = 301
    ctx.redirect(ctx.request.url.toLowerCase())
  } else {
    return next()
  }
}
