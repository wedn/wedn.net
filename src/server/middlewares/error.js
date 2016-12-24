import path from 'path'
import http from 'http'

import xtpl from 'node-xtemplate'

// const timeout = async ctx => {
//   try {
//     ctx && !ctx.body && ctx.throw(408)
//   } catch (error) {
//     await handleError(error, ctx)
//   }
// }

const handleError = async (error, ctx) => {
  const isDev = ctx.app.env === 'development'
  ctx.status = error.status || 500

  // application
  ctx.app.emit('error', error, ctx)

  // accepted types
  switch (ctx.accepts('html', 'text', 'json')) {
    case 'text':
      ctx.type = 'text/plain'
      if (isDev) {
        ctx.body = error.message
      } else if (error.expose) {
        ctx.body = error.message
      } else {
        throw error
      }
      break

    case 'json':
      ctx.type = 'application/json'
      if (isDev) {
        ctx.body = { status: ctx.status, error: error.message }
      } else if (error.expose) {
        ctx.body = { status: ctx.status, error: error.message }
      } else {
        ctx.body = { status: ctx.status, error: http.STATUS_CODES[ctx.status] }
      }
      break

    case 'html':
      const name = [404, 500].includes(error.status) ? error.status : 'error'
      ctx.type = 'text/html'
      ctx.body = await xtpl.render(path.join(__dirname, '../views/shared', name + '.html'), {
        ctx: ctx, env: ctx.app.env, request: ctx.request, response: ctx.response, status: ctx.status, error: error.message, stack: error.stack, code: error.code
      })
      break
  }
}

export default config => async (ctx, next) => {
  try {
    // // timeout
    // const timer = setTimeout(timeout.bind(ctx), 5)
    // clearTimeout(timer)
    await next()
    ctx.status === 404 && !ctx.body && ctx.throw(404)
  } catch (error) {
    await handleError(error, ctx)
  }
}
