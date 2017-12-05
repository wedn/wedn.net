/**
 * Models
 *
 * References
 * - http://mongoosejs.com/docs/guide.html
 * - http://mongoosejs.com/docs/guide.html#options
 * - http://mongoosejs.com/docs/advanced_schemas.html
 */
const glob = require('glob')
const mongoose = require('mongoose')

const config = require('../config')
const { uri, options } = config.database

/**
 * Use native Promise
 */

mongoose.Promise = global.Promise

/**
 * Connect mongodb server
 */

mongoose.connect(uri, options).on('error', console.error)

/**
 * Use plugins
 */

// mongoose.plugin(require('./plugins/timestamp'))

/**
 * Schema options
 * http://mongoosejs.com/docs/guide.html
 */

mongoose.plugin(schema => {
  schema.set('id', true)
  schema.set('_id', false)
  schema.set('timestamps', {})
  schema.set('strict', true)
  schema.set('validateBeforeSave', true)
})

/**
 * Load & export models
 */

glob.sync('./*.js', { cwd: __dirname }).forEach(path => {
  if (path === './index.js') return
  const model = require(path)
  exports[model.modelName] = model
})

/**
 * Export mongoose
 */

exports.mongoose = mongoose
