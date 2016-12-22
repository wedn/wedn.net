import test from 'ava'
import { isUsername } from '../../server/libraries/validator'

test('libraries.validator', t => {
  t.true(isUsername('icestone'))
  t.false(isUsername('12icestone'))
  t.false(isUsername('iceStone'))
  t.false(isUsername('ic'))
})
