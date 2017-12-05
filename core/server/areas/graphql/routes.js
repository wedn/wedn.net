const compose = require('koa-compose')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa')

const schema = require('./schema')

// create router for app
const router = new Router()

// map router rules
router.get('/graphql', graphqlKoa({ schema }))
router.post('/graphql', bodyParser(), graphqlKoa({ schema }))
router.get('/graphiql', graphiqlKoa({ endpointURL: '/api/v2/graphql' }))

// export router routes
module.exports = compose([
  router.routes(),
  router.allowedMethods()
])
