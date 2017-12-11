/**
 * Config
 *
 * @see
 * - https://github.com/RisingStack/multi-process-nodejs-example/blob/master/config
 * - http://json-schema.org/
 * - https://www.npmjs.com/package/ajv
 */

const defaults = require('./default')

const env = process.env.NODE_ENV || 'development'

let envConfig = null
try {
  envConfig = require(`./${env}`)
} catch (e) {}

module.exports = Object.assign({}, defaults, envConfig)
