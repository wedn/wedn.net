import test from 'ava'
import db from '../../server/models/db'

test('utils', t => {
  t.is(db.utils.tableName('wedn'), 'w_wedn')
  t.is(db.utils.fieldName('wedn'), 'wedn')
})

test('validate', t => {
  t.truthy(db.validate.slug)
  t.truthy(db.validate.username)
  t.truthy(db.validate.key)
  t.truthy(db.validate.mobile)
})
