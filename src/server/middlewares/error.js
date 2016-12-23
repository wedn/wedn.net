import path from 'path'
import http from 'http'
import { xTemplate } from 'koa-xtpl'

const render = (name, data) => new Promise(function (resolve, reject) {
  xTemplate.render(name, data, {}, (err, result) => {
    if (err) return reject(err)
    resolve(result)
  })
})

export default config => async (ctx, next) => {
  try {
    await next()
    if (ctx.response.status === 404 && !ctx.response.body) ctx.throw(404)
  } catch (err) {
    ctx.status = err.status || 500

    const app = ctx.app
    // application
    app.emit('error', err, ctx)

    // accepted types
    switch (ctx.accepts('html', 'text', 'json')) {
      case 'text':
        ctx.type = 'text/plain'
        if (app.env === 'development') ctx.body = err.message
        else if (err.expose) ctx.body = err.message
        else throw err
        break

      case 'json':
        ctx.type = 'application/json'
        if (app.env === 'development') ctx.body = { error: err.message }
        else if (err.expose) ctx.body = { error: err.message }
        else ctx.body = { error: http.STATUS_CODES[ctx.status] }
        break

      case 'html':
        ctx.type = 'text/html'
        ctx.body = await render(path.join(__dirname, '../views/shared', 'error.xtpl'), {
          ctx: ctx,
          env: app.env,
          request: ctx.request,
          response: ctx.response,
          status: ctx.status,
          error: err.message,
          stack: err.stack,
          code: err.code
        })
        break
    }
  }
}
