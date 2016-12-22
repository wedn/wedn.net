import test from 'ava'
import db from '../../server/models/db'
import { Comment, CommentMeta, Option, Post, PostMeta, Term, TermMeta, TermRelation, User, UserMeta } from '../../server/models'

test('index', t => {
  t.truthy(Comment instanceof db.Model)
  t.truthy(CommentMeta instanceof db.Model)
  t.truthy(Option instanceof db.Model)
  t.truthy(Post instanceof db.Model)
  t.truthy(PostMeta instanceof db.Model)
  t.truthy(Term instanceof db.Model)
  t.truthy(TermMeta instanceof db.Model)
  t.truthy(TermRelation instanceof db.Model)
  t.truthy(User instanceof db.Model)
  t.truthy(UserMeta instanceof db.Model)
})
