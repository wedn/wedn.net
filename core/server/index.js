// default env
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

// catch unhandled exception
process.on('uncaughtException', error => console.error(error))
process.on('unhandledRejection', (reason, p) => console.log(reason, p))

// module dependencies
const debug = require('debug')('wedn:server')
const mount = require('koa-mount')
const app = require('./app')
const config = require('./config')

module.exports = async rootApp => {
  debug('Begin start server...')

  // has no parent app
  if (!rootApp) {
    debug('Start server as root app.')

    // begin listening
    const server = app.listen(config.server)

    // handle server listening success
    server.on('listening', () => {
      debug(`Server listening on ${config.server.url}`)
    })

    // handle server listening failed
    server.on('error', error => {
      if (error.syscall !== 'listen') throw error

      // handle specific listen errors with friendly messages
      if (error.code === 'EACCES') {
        console.error(`Port ${config.server.port} requires elevated privileges.`)
        return
      }
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${config.server.port} is already in use.`)
        return
      }

      // throw others error
      throw error
    })

    return app
  }

  // root app is express app
  if (rootApp.constructor.name === 'EventEmitter') {
    debug('Start server as sub app for a express app.')
    rootApp.use(app.callback())
    return app
  }

  // root app is koa app
  if (rootApp.constructor.name === 'Application') {
    debug('Start server as sub app for a koa app.')
    rootApp.use(mount(app))
    return app
  }

  // root app is built in server
  if (rootApp.constructor.name === 'Server') {
    debug('Start server as sub app for a built in server app.')
    rootApp.on('request', app.callback())
    return app
  }

  return app
}
