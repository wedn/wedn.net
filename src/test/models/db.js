import test from 'ava'
import db from '../../server/models/db'

test('models.db.utils', t => {
  t.is(db.utils.tableName('wedn'), 'w_wedn')
  t.is(db.utils.fieldName('wedn'), 'wedn')
})

test('models.db.validate', t => {
  db.validate.isSlug('hello-world_s')
  db.validate.isUsername('icestone')
  db.validate.isPassword('helloworldhelloworldhelloworldhelloworldhelloworldhelloworld')
  db.validate.isEmail('ice@wedn.net')
  db.validate.isMobile('')
  db.validate.isMobile('13241089099')
  db.validate.isKey('hello_world')
})
