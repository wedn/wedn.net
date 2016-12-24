import Koa from 'koa'
import mount from 'koa-mount'

import config from './config'
import middlewares from './middlewares'
import { db, Option } from './models'

export default async parent => {
  // ## Sync to database
  await db.sync({ force: false })

  // ## Application instance
  const app = new Koa()

  // ## Load db option
  app.options = app.context.options = await Option.load()

  // ## Application config
  config.app = app

  // ## Load middlewares
  app.use(middlewares(config))

  // // ## Test response
  // app.use(ctx => {
  //   // throw new Error(12)
  // })

  // ## Mount to parent
  if (parent) return parent.use(mount(config.root, app))

  // ## Listen
  app.listen(config.server, err => err || console.log(`server running @ ${config.url}`))
}
