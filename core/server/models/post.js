import db from './db'

const Post = db.Model.extend({
  tableName: 'posts'
})

export default Post
