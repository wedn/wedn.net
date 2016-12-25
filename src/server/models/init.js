import pkg from '../../../package.json'
import { hash } from '../libraries/encrypt'

export default async function init (db) {
  await db.models.Option.bulkCreate([
    { key: 'app_name', value: pkg.name },
    { key: 'app_version', value: pkg.version },
    { key: 'app_description', value: pkg.description },
    { key: 'site_name', value: 'WEDN.NET' },
    { key: 'site_description', value: 'make IT better' },
    { key: 'site_favicon', value: '/favicon.ico' },
    { key: 'site_charset', value: 'utf-8' },
    { key: 'site_lang', value: 'zh-CN' },
    { key: 'site_theme', value: '2016' },
    { key: 'last_updated', value: '2016-12-24T15:42:32' }
  ])

  await db.models.User.create({
    slug: 'zce',
    username: 'zce',
    password: await hash('5love100'),
    nickname: 'iceStone',
    email: 'zce@wedn.net',
    mobile: '13241087977',
    status: 'activated',
    role: 'administrator',
    Meta: [
      { key: 'first_name', value: 'Lei' },
      { key: 'last_name', value: 'Wang' }
    ]
  }, {
    include: [db.models.User.associations.Meta]
  })
}
