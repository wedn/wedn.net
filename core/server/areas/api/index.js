/**
 * module dependencies
 */

const Koa = require('koa')

const routes = require('./routes')
const middlewares = require('./middlewares')

/**
 * create api app
 */

const app = new Koa()

/**
 * load app middlewares
 */

app.use(middlewares)

/**
 * load app routes
 */

app.use(routes)

/**
 * export api app
 */

module.exports = app
