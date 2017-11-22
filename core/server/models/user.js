const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const schema = new mongoose.Schema({
  slug: { type: String },
  username: { type: String },
  email: { type: String },
  mobile: { type: String },
  password: { type: String },
  nickname: { type: String },
  avatar: { type: String },
  status: { type: String, default: 'unactivated', enum: ['unactivated', 'activated', 'forbidden'] },
  // enum: ['subscriber', 'contributor', 'author', 'editor', 'administrator']
  roles: [{ type: String, default: 'subscriber' }],
  posts: [{ type: ObjectId, ref: 'Post' }],
  comments: [{ type: ObjectId, ref: 'Comment' }],
  meta: {
    url: { type: String },
    bio: { type: String },
    cover: { type: String },
    location: { type: String }
  }
})

schema.loadClass(class {})

module.exports = mongoose.model('User', schema)
