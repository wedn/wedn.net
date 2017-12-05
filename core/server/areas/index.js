/**
 * https://github.com/chrisveness/koa-sample-web-app-api-mysql/blob/master/app.js
 */

const compose = require('koa-compose')
const mount = require('koa-mount')
const adminArea = require('./admin')
const apiArea = require('./api')
const graphqlArea = require('./graphql')

/**
 * export all apps
 */
module.exports = compose([
  mount('/admin', adminArea),
  mount('/api/v1', apiArea),
  mount('/api/v2', graphqlArea)
])
