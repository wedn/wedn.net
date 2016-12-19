import Koa from 'koa'

import config from './config'
import middlewares from './middlewares'

// Application instance
const app = new Koa()

// Application config
app.name = config.name
app.version = config.version
app.keys = config.keys

// Load middlewares
app.use(middlewares(app, config))

// Export bootstrap method
export default app.listen(config.server, err => {
  if (err) throw err
  console.log(`server running @ ${config.url}`)
  // console.log(`server running @ http://${config.server.host}:${config.server.port}`)
})

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

// import Koa from 'koa'
// import Router from 'koa-router'

// import config from '../config'
// import middlewares from './middlewares'

// // Application instance
// const app = new Koa()

// // Application config
// app.name = config.name
// app.version = config.version
// app.keys = config.keys

// // Load middlewares
// app.use(middlewares(app, config))

// // Export bootstrap method
// export default app

// // /**
// //  * 错误处理
// //  * https://github.com/koajs/onerror
// //  * https://github.com/koajs/error
// //  */
// // if (app.env === 'development') {
// //   onerror(app)
// // } else {
// //   onerror(app, {
// //     redirect: '/error.html'
// //   })
// // }
