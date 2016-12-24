import test from 'ava'
import { db, Comment, Option, Post, Term, User } from '../../server/models'

test.before(async t => {
  await db.sync({ force: true })
})

test('models.index', t => {
  t.truthy(Comment instanceof db.Model)
  t.truthy(Comment.Meta instanceof db.Model)
  t.truthy(Option instanceof db.Model)
  t.truthy(Post instanceof db.Model)
  t.truthy(Post.Meta instanceof db.Model)
  t.truthy(Term instanceof db.Model)
  t.truthy(Term.Meta instanceof db.Model)
  t.truthy(Term.Relation instanceof db.Model)
  t.truthy(User instanceof db.Model)
  t.truthy(User.Meta instanceof db.Model)
})
