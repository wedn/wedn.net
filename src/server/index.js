import Koa from 'koa'
import mount from 'koa-mount'

import config from './config'
import middlewares from './middlewares'
import { db, seed } from './models'

// # Export bootstrap
export default async parent => {
  // ## Sync to database
  // db.afterBulkSync(() => {})
  await db.sync({ force: false })

  // ## Load db option
  let options = await db.models.Option.load()

  // ## Init data
  Object.keys(options).length || await seed(config)
  options = await db.models.Option.load()
  config.options = options

  // ## Application instance
  const app = new Koa()

  // ## Application config
  // app.db = db
  app.config = config
  app.options = config.options
  app.keys = config.cookie.keys
  app.name = config.name
  app.version = config.version

  // ## Load middlewares
  app.use(middlewares(app))

  // // ## Test response
  // app.use(ctx => {
  //   // throw new Error(12)
  // })

  if (parent) {
    // ### Mount to parent
    if (parent instanceof Koa) {
      // koa
      parent.use(mount(config.root, app))
    } else {
      // express
      parent.use(config.root, app.callback())
    }
  } else {
    // ### Listen
    app.listen(config.server, error => error || console.log(`server running @ ${options.site_url}`))
  }

  return app
}
