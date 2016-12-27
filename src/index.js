import bootstrap from './server'

process
  .on('uncaughtException', error => {
    console.log(error)
  })
  .on('unhandledRejection', (reason, p) => {
    console.log(reason, p)
  })

// Bootstrap app
bootstrap()

import './demo'
