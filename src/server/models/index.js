/**
 * Must execute sync in portal
 * http://itbilu.com/nodejs/npm
 * http://itbilu.com/nodejs/npm/EJarwPD8W.html
 */

// # Import Models
import db from './db'
import init from './init'

import Comment from './comment'
import CommentMeta from './comment-meta'
import Option from './option'
import Post from './post'
import PostMeta from './post-meta'
import Term from './term'
import TermMeta from './term-meta'
import TermRelation from './term-relation'
import User from './user'
import UserMeta from './user-meta'

// # Relations
Comment.hasMany(CommentMeta, {
  foreignKey: 'comment_id',
  targetKey: 'id',
  as: 'Meta',
  constraints: false
})

Post.hasMany(PostMeta, {
  foreignKey: 'post_id',
  targetKey: 'id',
  as: 'Meta',
  constraints: false
})

Post.belongsToMany(Term, {
  through: TermRelation,
  foreignKey: 'post_id',
  otherKey: 'term_id',
  as: 'Relation',
  constraints: false
})

Term.belongsToMany(Post, {
  through: TermRelation,
  foreignKey: 'term_id',
  otherKey: 'post_id',
  as: 'Relation',
  constraints: false
})

Term.hasMany(TermMeta, {
  foreignKey: 'term_id',
  targetKey: 'id',
  as: 'Meta',
  constraints: false
})

User.hasMany(UserMeta, {
  foreignKey: 'user_id',
  targetKey: 'id',
  as: 'Meta',
  constraints: false
})

// # Meta Alias
Comment.Meta = CommentMeta
Post.Meta = PostMeta
Term.Meta = TermMeta
Term.Relation = TermRelation
User.Meta = UserMeta

// # Export
export { db, init, Comment, Option, Post, Term, User }
