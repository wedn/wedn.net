import { bootstrap } from './server'

bootstrap()

// import Koa from 'koa'
// import mount from 'koa-mount'
// import wedn from './server'
// import config from './config'

// const app = new Koa()

// app.keys = config.keys

// app.use(mount(config.root, wedn))

// app.listen(config.server, err => {
//   if (err) throw err
//   console.log(`server running @ ${config.url}`)
//   // console.log(`server running @ http://${config.server.host}:${config.server.port}`)
// })

// // export const bootstrap = () => {
// //   return app.listen(config.server, err => {
// //     if (err) throw err
// //     console.log(`server running @ http://${config.server.host}:${config.server.port}`)
// //   })
// // }

// // import { bootstrap } from './server'

// // bootstrap()
