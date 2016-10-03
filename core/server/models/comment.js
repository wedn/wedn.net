import db from './db'

const Comment = db.Model.extend({
  tableName: 'comments'
})

const CommentMeta = db.Model.extend({
  tableName: 'comment_meta'
})

export {
  Comment,
  CommentMeta
}
