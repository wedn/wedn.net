/**
 * Api app
 */

const Koa = require('koa')

const middlewares = require('./middlewares')
const routes = require('./routes')

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
