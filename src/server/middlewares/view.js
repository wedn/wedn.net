import path from 'path'
import convert from 'koa-convert'
import compose from 'koa-compose'
import json from 'koa-json'
import xtpl from 'koa-xtpl'

export default (options) => {
  const engines = []

  // JSON Format
  engines.push(convert(json({
    pretty: false,
    param: 'pretty'
  })))

  // Global Template Data
  engines.push((ctx, next) => {
    ctx.state = {
      request: ctx.request,
      response: ctx.response,
      cookie: ctx.cookie,
      session: ctx.session,
      context: ctx
    }
    return next()
  })

  // Template Engine
  engines.push(xtpl({
    root: path.join(__dirname, '../views/')
  }))

  return compose(engines)
}
