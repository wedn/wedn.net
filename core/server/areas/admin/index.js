// module dependencies
const Koa = require('koa')

// admin app
const app = new Koa()

// response
app.use(async ctx => {
  ctx.body = 'admin area'
})

module.exports = app
