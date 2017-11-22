const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const schema = new mongoose.Schema({
  slug: { type: String },
  name: { type: String },
  // enum: ['blog_tag', 'blog_category', 'course_tag', 'course_category']
  taxonomy: { type: String, default: 'tag' },
  description: { type: String },
  posts: [{ type: ObjectId, ref: 'Post' }],
  parent: { type: ObjectId, ref: 'Term' },
  meta: {
    count: { type: Number, default: 0 }
  }
})

schema.loadClass(class {})

module.exports = mongoose.model('Term', schema)
