const mongoose = require('mongoose')
const { Mixed, ObjectId } = mongoose.Schema.Types

const schema = new mongoose.Schema({
  slug: { type: String, unique: true, lowercase: true, trim: true },
  title: { type: String },
  excerpt: { type: String },
  content: { type: Mixed },
  // enum: ['blog', 'page', 'course', 'video']
  type: { type: String, default: 'blog' },
  status: { type: String, default: 'drafted', enum: ['inherit', 'drafted', 'published', 'trashed'] },
  comment: { type: String, default: 'opened', enum: ['opened', 'closed'] },
  user: { type: ObjectId, ref: 'User' },
  terms: [{ type: ObjectId, ref: 'Term' }],
  comments: [{ type: ObjectId, ref: 'Comment' }],
  parent: { type: ObjectId, ref: 'Post' },
  meta: {
    comments: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    votes: { type: Number, default: 0 },
    favs: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 }
  }
})

schema.loadClass(class {})

module.exports = mongoose.model('Post', schema)
