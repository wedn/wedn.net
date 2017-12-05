const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  key: { type: String, unique: true },
  value: { type: String },
  enabled: { type: Boolean, default: true }
})

schema.loadClass(class {})

module.exports = mongoose.model('Option', schema)
