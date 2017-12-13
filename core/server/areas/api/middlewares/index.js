/**
 * API App middlewares
 */

const compose = require('koa-compose')
const bodyParser = require('koa-bodyparser')
const error = require('./error')
const parameters = require('./parameters')
// const authenticate = require('./authenticate')
// const authorize = require('./authorize')
const respond = require('./respond')

const middlewares = []

middlewares.push(error())

middlewares.push(parameters())

middlewares.push(bodyParser())

// middlewares.push(authenticate())

// middlewares.push(authorize())

middlewares.push(respond())

module.exports = compose(middlewares)
