/**
 * 请求URL友好化
 * https://stackoverflow.com/questions/36125416/how-to-manage-url-with-or-without-and/36163754#36163754
 */
export default app => (ctx, next) => {
  // return next()
  if (!/[A-Z]/.test(ctx.request.path) || !ctx.request.path.endsWith('/')) return next()
  ctx.status = 301
  ctx.redirect(ctx.request.path.toLowerCase().slice(0, ctx.request.path.length - 1))
}

// // Redirects "/hello/world/" to "/hello/world"
// function removeTrailingSlash () {
//   return function * (next) {
//     if (this.path.length > 1 && this.path.endsWith('/')) {
//       this.redirect(this.path.slice(0, this.path.length - 1))
//       return
//     }
//     yield * next
//   }
// }

// // Redirects "/hello/world?" to "/hello/world"
// function removeQMark () {
//   return function * (next) {
//     if (this.path.search === '?') {
//       this.redirect(this.path)
//       return
//     }
//     yield * next
//   }
// }
// export default app => (ctx, next) => {
//   if (/[A-Z]/.test(ctx.request.url)) {
//     ctx.status = 301
//     ctx.redirect(ctx.request.url.toLowerCase())
//   } else {
//     return next()
//   }
// }
