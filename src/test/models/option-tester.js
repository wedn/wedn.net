import test from 'ava'
import { Option } from '../../server/models'

test.before(async t => {
  await Option.sync({ force: true })
})

test('models.option.init', async t => {
  await Option.bulkCreate([
    { key: 'site_name', value: 'WEDN.NET' },
    { key: 'site_description', value: 'make IT better' },
    { key: 'site_favicon', value: '/favicon.ico' },
    { key: 'site_lang', value: 'zh-CN' },
    { key: 'site_theme', value: '2016' }
  ])
})
