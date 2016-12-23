// http://itbilu.com/nodejs/npm/EJarwPD8W.html
// # Import Models

import db from './db'

// import Comment from './comment'
// import CommentMeta from './comment-meta'
import Option from './option'
// import Post from './post'
// import PostMeta from './post-meta'
// import Term from './term'
// import TermMeta from './term-meta'
// import TermRelation from './term-relation'
import User from './user'
import UserMeta from './user-meta'

// # Relations
// Post.belongsToMany(TermMeta, { through: TermRelation })
User.hasMany(UserMeta, { targetKey:'id', foreignKey:'user_id', as: 'Meta', constraints: false })

// # Sync to database

db.sync({ force: false })

// # Meta Alias
// Comment.Meta = CommentMeta
// Post.Meta = PostMeta
// Term.Meta = TermMeta
// Term.Relation = TermRelation
User.Meta = UserMeta

// # Export
// export { Comment, CommentMeta, Option, Post, PostMeta, Term, TermMeta, TermRelation, User, UserMeta }
export { db, Option, User }
