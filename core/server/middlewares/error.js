/**
 * Error handler
 * https://github.com/koajs/error
 */

const Youch = require('youch')

const handleError = async (error, ctx) => {
  ctx.status = error.status || 500

  // emit application error
  ctx.app.emit('error', error, ctx)

  const youch = new Youch(error, ctx.req)

  // accepted types
  switch (ctx.accepts('html', 'text', 'json')) {
    case 'html':
      ctx.body = await youch.toHTML()
      break

    case 'json':
      ctx.body = await youch.toJSON()
      break

    case 'text':
      ctx.type = 'text/plain'
      ctx.body = youch.toString()
      break
  }
}

module.exports = app => async (ctx, next) => {
  try {
    await next()
    // ctx.status === 404 && !ctx.body && ctx.throw(ctx.status)
    if (ctx.status >= 400) ctx.throw(ctx.status)
  } catch (e) {
    await handleError(e, ctx)
  }
}

// const { STATUS_CODES } = require('http')

// const handleError = async (error, ctx) => {
//   ctx.status = error.status || 500

//   // emit application error
//   ctx.app.emit('error', error, ctx)

//   // accepted types
//   switch (ctx.accepts('html', 'text', 'json')) {
//     case 'html':
//       ctx.type = 'text/html'
//       await ctx.render('error', {
//         context: ctx,
//         request: ctx.request,
//         response: ctx.response,
//         error: error
//       })
//       break

//     case 'json':
//       ctx.type = 'application/json'
//       if (ctx.app.env === 'development' || error.expose) {
//         ctx.body = { status: ctx.status, errors: [ error.message ], stacks: [ error.stack ] }
//       } else {
//         // ctx.body = { status: ctx.status, errors: [ STATUS_CODES[ctx.status] ] }
//         ctx.body = { status: ctx.status, errors: [ ctx.message ] }
//       }
//       break

//     case 'text':
//       ctx.type = 'text/plain'
//       if (ctx.app.env === 'development' || error.expose) {
//         ctx.body = error.message
//       } else {
//         // ctx.body = STATUS_CODES[ctx.status]
//         ctx.body = ctx.message
//       }
//       break
//   }
// }

// module.exports = app => async (ctx, next) => {
//   try {
//     await next()
//     // ctx.status === 404 && !ctx.body && ctx.throw(ctx.status)
//     if (ctx.status >= 400) ctx.throw(ctx.status)
//   } catch (error) {
//     await handleError(error, ctx)
//   }
// }
