// module dependencies
const Koa = require('koa')
const config = require('./config')
const middlewares = require('./middlewares')
const areas = require('./areas')
const routes = require('./routes')

// main app
const app = new Koa()

// mount config
app.config = config

// load middlewares
app.use(middlewares(app))

// app areas
app.use(areas)

// app routes
app.use(routes)

module.exports = app
