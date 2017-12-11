const test = require('ava')

const { mailer } = require('../../../server/utils')

test('server/utils/mailer#send', async t => {
  const res = await mailer.send('w@zce.me', 'test email subject', '<h1>this is a test email</h1>', {
    filename: 'demo.txt',
    content: 'Hello attachments'
  }, ['i@zce.me'], 'it@zce.me')
  t.is(res.accepted.length, 3)
})

test('server/utils/mailer#send2', async t => {
  const res = await mailer.send('w@zce.me', 'test email subject', '<h1>this is a test email</h1>')
  t.is(res.accepted.length, 1)
})
