// # Import Models
// import Comment from './comment'
// import CommentMeta from './comment-meta'
// import Option from './option'
// import Post from './post'
// import PostMeta from './post-meta'
// import Term from './term'
// import TermMeta from './term-meta'
// import TermRelation from './term-relation'
import User from './user'
import UserMeta from './user-meta'

// # Relations
// Post.belongsToMany(TermMeta, { through: TermRelation })
User.hasMany(UserMeta, { as: 'Meta' })

// # Sync to database
// Comment.sync({ force: false })
// CommentMeta.sync({ force: false })
// Option.sync({ force: false })
// Post.sync({ force: false })
// PostMeta.sync({ force: false })
// Term.sync({ force: false })
// TermMeta.sync({ force: false })
// TermRelation.sync({ force: false })
User.sync({ force: false })
UserMeta.sync({ force: false })

// # Export
export { /*Comment, CommentMeta, Option, Post, PostMeta, Term, TermMeta, TermRelation, */User, UserMeta }
