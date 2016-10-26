import path from 'path'

import convert from 'koa-convert'
import compose from 'koa-compose'
import json from 'koa-json'
import views from 'koa-views'

export default (options) => {
  const engines = []

  // JSON Format
  engines.push(convert(json({
    pretty: false,
    param: 'pretty'
  })))

  // Template Engine
  engines.push(views(path.resolve(__dirname, '../views/'), {
    extension: 'hbs',
    map: {
      hbs: 'handlebars'
      // jade: 'jade',
      // html: 'nunjucks',
    }
  }))

  // engines.push(views(options.paths.theme, {
  //   extension: 'hbs',
  //   map: {
  //     hbs: 'handlebars'
  //     // jade: 'jade',
  //     // html: 'nunjucks',
  //   }
  // }))

  // engines.push(convert(hbs.middleware({
  //   viewPath: path.join(__dirname, 'views')
  // })))

  // 模板引擎render方法适配
  // engines.push(async (ctx, next) => {
  //   ctx.render = ctx.render.bind(ctx)
  //   await next()
  // })

  return compose(engines)
}
