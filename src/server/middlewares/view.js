import url from 'url'
import path from 'path'
import convert from 'koa-convert'
import compose from 'koa-compose'
import json from 'koa-json'
import xtpl from 'koa-xtpl'

export default config => {
  const engines = []

  // JSON Format
  engines.push(convert(json({
    pretty: false,
    param: 'pretty'
  })))

  // Global Template Data
  engines.push((ctx, next) => {
    ctx.state = {
      context: ctx,
      cookie: ctx.cookie,
      session: ctx.session,
      options: ctx.options,
      request: ctx.request,
      response: ctx.response
    }
    return next()
  })

  // Template Engine
  engines.push(xtpl({
    root: path.join(__dirname, '../views/'),
    extname: 'html',
    commands: {
      url (scope, option, buffer) {
        const pathname = path.posix.join(config.root, ...option.params)
        // const pathname = path.posix.resolve(config.root, ...option.params)
        return buffer.write(url.resolve(config.url, pathname))
      },
      assets (scope, option, buffer) {
        return this.url(scope, option, buffer)
      }
    }
  }))

  return compose(engines)
}
