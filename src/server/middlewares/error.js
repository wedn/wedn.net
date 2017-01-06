/**
 * 错误处理
 */
import path from 'path'
import http from 'http'
import xtpl from 'node-xtemplate'

const handleError = async (error, ctx) => {
  ctx.status = error.status || 500
  // application
  ctx.app.emit('error', error, ctx)
  // accepted types
  switch (ctx.accepts('html', 'text', 'json')) {
    case 'html':
      const name = [404, 500].includes(error.status) ? error.status : 'error'
      ctx.type = 'text/html'
      ctx.body = await xtpl.render(path.join(__dirname, '../views/shared', name + '.html'), { context: ctx, error: error })
      break
    case 'json':
      ctx.type = 'application/json'
      if (ctx.app.env === 'development' || error.expose) {
        ctx.body = { status: ctx.status, errors: [error.message] }
      } else {
        ctx.body = { status: ctx.status, errors: [http.STATUS_CODES[ctx.status]] }
      }
      break
    case 'text':
      ctx.type = 'text/plain'
      if (ctx.app.env === 'development' || error.expose) {
        ctx.body = error.message
      } else {
        ctx.body = http.STATUS_CODES[ctx.status]
        // throw error
      }
      break
  }
}

export default app => async (ctx, next) => {
  try {
    await next()
    ctx.status === 404 && !ctx.body && ctx.throw(404)
  } catch (error) {
    await handleError(error, ctx)
  }
}
