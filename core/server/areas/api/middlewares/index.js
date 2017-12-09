/**
 * API App middlewares
 */

const compose = require('koa-compose')
const bodyParser = require('koa-bodyparser')
const error = require('./error')
// const authenticate = require('./authenticate')
// const authorize = require('./authorize')

const middlewares = []

middlewares.push(error())

middlewares.push(bodyParser())

// middlewares.push(authenticate())

// middlewares.push(authorize())

module.exports = compose(middlewares)
