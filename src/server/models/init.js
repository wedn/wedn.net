import { hash } from '../libraries/encrypt'

export default async function init (db) {
  await db.models.Option.bulkCreate([
    { key: 'site_name', value: 'WEDN.NET' },
    { key: 'site_description', value: 'make IT better' },
    { key: 'site_favicon', value: '/favicon.ico' },
    { key: 'site_lang', value: 'zh-CN' },
    { key: 'site_theme', value: '2016' }
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
