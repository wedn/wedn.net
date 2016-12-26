import bootstrap from './app'

process
  .on('uncaughtException', error => {
    console.log(error)
  })
  .on('unhandledRejection', (reason, p) => {
    console.log(reason, p)
  })

// import Koa from 'koa'

// const app = new Koa()

// app.listen(1080, err => err || console.log(`server running @ 1080`))

// Bootstrap app
bootstrap()

import './demo'
