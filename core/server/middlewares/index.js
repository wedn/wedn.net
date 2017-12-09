/**
 * 整合全部中间件
 */
const compose = require('koa-compose')

// load all of the middlewares
const logger = require('./logger')
const header = require('./header')
// const error = require('./error')
// const compress = require('./compress')
// const serve = require('./static')
// const url = require('./url')
// const body = require('./body')
const view = require('./view')
// const mailer = require('./mailer')
// const session = require('./session')
// const passport = require('./passport')
// const router = require('./router')

module.exports = app => {
  const middlewares = []

  // reference to config
  app.context.config = app.config

  // logger
  middlewares.push(logger(app))

  // custom response headers
  middlewares.push(header(app))

  // // error handler
  // middlewares.push(error(app))

  // // compress output
  // middlewares.push(compress(app))

  // // static assets
  // middlewares.push(serve(app))

  // // URL friendly
  // middlewares.push(url(app))

  // // request body parser
  // middlewares.push(body(app))

  // view engine
  middlewares.push(view(app))

  // // email
  // middlewares.push(mailer(app))

  // // session support
  // middlewares.push(session(app))

  // passport auth
  // middlewares.push(passport(app))

  // // auto route
  // middlewares.push(router(app))

  // compose all middlewares
  return compose(middlewares)
}
