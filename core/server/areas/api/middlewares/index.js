/**
 * Api app middlewares
 *
 * @todo authenticate, authorize
 */

const compose = require('koa-compose')
const bodyParser = require('koa-bodyparser')

const error = require('./error')
const q2m = require('./q2m')
const paginate = require('./paginate')

// middleware list
const middlewares = []

middlewares.push(error())

middlewares.push(q2m())

middlewares.push(paginate())

middlewares.push(bodyParser())

// compose & export middlewares
module.exports = compose(middlewares)
