import Koa from 'koa'
import Router from 'koa-router'
// import Boom from 'boom'

const app = new Koa()
const router = new Router({ prefix: '/demo' })

router.get('/', ctx => {
  ctx.body = 'home'
})

// router.get('/demo', ctx => {
//   ctx.status = 501
//   // ctx.body = 'demo'
// })

router.post('/demo', ctx => {

})

app.use(router.routes());
// app.use(router.allowedMethods({
//   throw: false,
//   notImplemented: () => new Boom.notImplemented(''),
//   methodNotAllowed: () => new Boom.methodNotAllowed()
// }))

// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// // response
// app.use(ctx => {
//   ctx.body = 'Hello Koa'
// })

// Export start method
export const start = config => app.listen(config.server, err => {
  if (err) throw err
  console.log(`server running @ http://${config.server.host}:${config.server.port}`)
})
