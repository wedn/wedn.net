import test from 'ava'
import db from '../../server/models/db'

test('models.db.utils', t => {
  t.is(db.utils.tableName('wedn'), 'w_wedn')
  t.is(db.utils.fieldName('wedn'), 'wedn')
})

test('models.db.validate', t => {
  db.validate.key('hello_world')
  db.validate.slug('hello-world_s')
  db.validate.username('icestone')
  db.validate.nickname('汪磊')
  db.validate.password('helloworldhelloworldhelloworldhelloworldhelloworldhelloworld')
  db.validate.email('ice@wedn.net')
  db.validate.mobile('')
  db.validate.mobile('13241089099')
})
