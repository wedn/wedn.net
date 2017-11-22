const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const schema = new mongoose.Schema({
  token: { type: String },
  ip: { type: String },
  agent: { type: String },
  user: { type: ObjectId, ref: 'User' }
})

schema.loadClass(class {})

module.exports = mongoose.model('Token', schema)
