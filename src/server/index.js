import Koa from 'koa'

import config from './config'
import middlewares from './middlewares'

// Application instance
const app = new Koa()

// Application config
config.app = app

// Load middlewares
app.use(middlewares(config))

// Test response
// app.use(ctx => {
//   // throw new Error(12)
// })

export default app.listen(config.server, err => {
  if (err) throw err
  console.log(`server running @ ${config.url}`)
  // console.log(`server running @ http://${config.server.host}:${config.server.port}`)
})
