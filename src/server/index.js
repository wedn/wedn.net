import Koa from 'koa'
import mount from 'koa-mount'

import config from './config'
import middlewares from './middlewares'
import { db, init } from './models'
import mailer from './libraries/mailer'

export default async parent => {
  // ## Sync to database
  // db.afterBulkSync(() => {})
  await db.sync({ force: false })

  // ## Load db option
  let options = await db.models.Option.load()

  // ## Init data
  Object.keys(options).length || await init(config)
  options = await db.models.Option.load()
  config.options = options

  // ## Application instance
  const app = new Koa()

  // ## Application config
  app.name = config.name
  app.version = config.version
  app.keys = config.cookie.keys
  app.config = config

  // ## Email server config
  mailer.config(options)
  app.context.sendMail = mailer.send

  // ## Load middlewares
  app.use(middlewares(app))

  // // ## Mount to parent
  // if (parent) return parent.use(mount(config.root, app))

  // // ## Listen
  // app.listen(config.server, error => error || console.log(`server running @ ${options.site_url}`))

  return app
}
