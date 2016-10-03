import Koa from 'koa'
import Router from 'koa-router'

import middlewares from './middlewares'

// Application instance
const app = new Koa()

// /**
//  * 错误处理
//  * https://github.com/koajs/onerror
//  * https://github.com/koajs/error
//  */
// if (app.env === 'development') {
//   onerror(app)
// } else {
//   onerror(app, {
//     redirect: '/error.html'
//   })
// }

// Export start method
export const start = config => {
  // Application config
  app.name = config.name
  app.version = config.version
  app.keys = config.keys

  // Load middlewares
  app.use(middlewares(app, config))

  return app.listen(config.server, err => {
    if (err) throw err
    console.log(`server running @ http://${config.server.host}:${config.server.port}`)
  })
}
