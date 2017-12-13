const { STATUS_CODES } = require('http')

const handleError = async (error, ctx) => {
  ctx.status = error.status || 500

  // emit application error
  ctx.app.emit('error', error, ctx)

  ctx.type = 'application/json'
  if (ctx.app.env === 'development' || error.expose) {
    const errors = error.errors
      ? error.errors
      : [ error ]
    ctx.body = { errors, stack: error.stack }
  } else {
    ctx.body = { errors: [ STATUS_CODES[ctx.status] ] }
  }
}

module.exports = () => async (ctx, next) => {
  try {
    await next()
    // ctx.status === 404 && !ctx.body && ctx.throw(ctx.status)
    if (ctx.status >= 400) ctx.throw(ctx.status)
  } catch (e) {
    await handleError(e, ctx)
  }
}
