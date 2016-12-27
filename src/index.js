import wedn from './server'
import devServer from './dev-server'
import config from './server/config'

process
  .on('uncaughtException', error => {
    console.log(error)
  })
  .on('unhandledRejection', (reason, p) => {
    console.log(reason, p)
  })

wedn().then(app => {
  devServer.use(app.callback())

  // ## Listen
  devServer.listen(config.server, error => error || console.log(`server running @ ${app.config.options.site_url}`))
})

