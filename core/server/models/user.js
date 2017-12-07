const slug = require('slug')
const mongoose = require('mongoose')

const encryptor = require('../utils/encryptor')

const { ObjectId } = mongoose.Schema.Types

/**
 * Model schema
 */

const schema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, unique: true, sparse: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true },
  avatar: { type: String, required: true },
  status: { type: String, required: true, default: 'unactivated', enum: ['unactivated', 'activated', 'forbidden'] },
  // enum: ['subscriber', 'contributor', 'author', 'editor', 'administrator']
  roles: [{ type: String }],
  posts: [{ type: ObjectId, ref: 'Post' }],
  comments: [{ type: ObjectId, ref: 'Comment' }],
  tokens: [{ type: ObjectId, ref: 'Token' }],
  meta: {
    url: { type: String },
    bio: { type: String },
    cover: { type: String },
    location: { type: String }
  }
})

/**
 * Model methods
 */

schema.loadClass(class {
  static findByUnique (unique, callback) {
    let prop = 'username'
    if (Number.isInteger(parseInt(unique))) {
      prop = 'mobile'
    } else if (unique.includes('@')) {
      prop = 'email'
    }
    return this.findOne({ [prop]: unique }, callback)
  }

  comparePassword (password) {
    return encryptor.compare(password, this.password)
  }
})

/**
 * Model hooks
 */

schema.pre('validate', async function (next) {
  this.nickname = this.nickname || this.username
  this.username = this.username.toLowerCase()
  this.slug = this.slug || slug(this.username)
  this.email = this.email.toLowerCase()
  this.avatar = this.avatar || `https://gravatar.com/avatar/${encryptor.md5(this.email)}?size=48`
  this.password = await encryptor.hash(this.password)
  next()
})

/**
 * Export model
 */

module.exports = mongoose.model('User', schema)
