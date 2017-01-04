/**
 * 视图引擎配置
 * TODO：[Legacy middleware]
 */
import url from 'url'
import path from 'path'
import compose from 'koa-compose'
import json from 'koa-json'
import xtpl from 'koa-xtpl'
import send from 'koa-send'

export default app => {
  const engines = []

  // ## JSON Format
  engines.push(json({
    pretty: false,
    param: 'pretty'
  }))

  // ## Send
  engines.push((ctx, next) => {
    ctx.send = (...args) => send(ctx, ...args)
    return next()
  })

  // ## Global template data
  engines.push((ctx, next) => {
    ctx.state = {
      context: ctx,
      cookie: ctx.cookie,
      session: ctx.session,
      request: ctx.request,
      response: ctx.response,
      config: app.config,
      options: ctx.options
    }
    return next()
  })

  // ## Template engine
  engines.push(xtpl({
    root: path.join(__dirname, '../views/'),
    extname: 'html',
    commands: {
      url (scope, option, buffer) {
        const pathname = path.posix.join(app.config.root, ...option.params)
        return buffer.write(url.resolve(app.config.options.site_url, pathname))
      },
      assets (scope, option, buffer) {
        return this.url(scope, option, buffer)
      },
      stringify (scope, option, buffer) {
        return buffer.write(JSON.stringify(option.params[0]))
      }
    }
  }))

  return compose(engines)
}
