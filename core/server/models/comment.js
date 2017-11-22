const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const schema = new mongoose.Schema({
  author: {
    name: { type: String },
    email: { type: String },
    url: { type: String },
    agent: { type: String },
    ip: { type: String }
  },
  content: { type: String },
  status: { type: String, default: 'held', enum: ['held', 'approved', 'spammed', 'trashed'] },
  post: { type: ObjectId, ref: 'Post' },
  user: { type: ObjectId, ref: 'User' },
  parent: { type: ObjectId, ref: 'Comment' },
  meta: {
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 }
  }
})

schema.loadClass(class {})

module.exports = mongoose.model('Comment', schema)
