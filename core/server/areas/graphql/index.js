// module dependencies
const Koa = require('koa')
const routes = require('./routes')

// graphql app
const app = new Koa()

// routes
app.use(routes)

module.exports = app
