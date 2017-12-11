/**
 * Config
 *
 * @see
 * - https://github.com/RisingStack/multi-process-nodejs-example/blob/master/config
 */

const defaults = require('./default')

const env = process.env.NODE_ENV || 'development'

let envConfig = null
try {
  envConfig = require(`./${env}`)
} catch (e) {}

module.exports = Object.assign({}, defaults, envConfig)
