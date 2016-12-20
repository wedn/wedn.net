export default () => async (ctx, next) => {
  if (/[A-Z]/.test(ctx.request.url)) {
    ctx.status = 301
    ctx.redirect(ctx.request.url.toLowerCase())
  } else {
    await next()
  }
}
