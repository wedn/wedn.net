import db from './db'
import encryptor from '../libraries/encryptor'

export default async function init (config) {
  await db.models.Option.bulkCreate([
    // App info
    { key: 'app_name', value: config.name },
    { key: 'app_version', value: config.version },
    { key: 'app_description', value: config.description },
    // Site config
    { key: 'site_url', value: 'http://localhost:2080/' },
    { key: 'site_name', value: 'WEDN.NET' },
    { key: 'site_description', value: 'make IT better' },
    { key: 'site_favicon', value: '/favicon.ico' },
    { key: 'site_charset', value: 'utf-8' },
    { key: 'site_lang', value: 'zh-CN' },
    { key: 'site_theme', value: '2016' },
    // Mail server
    { key: 'mail_server_hostname', value: 'smtp.exmail.qq.com' },
    { key: 'mail_server_port', value: '465' },
    { key: 'mail_server_secure', value: 'true' },
    { key: 'mail_server_name', value: 'WEDN.NET' },
    { key: 'mail_server_login', value: 'service@wedn.net' },
    { key: 'mail_server_password', value: '87AqZ!SA' },
    // Other
    { key: 'last_updated', value: '2016-12-24T15:42:32' }
  ])

  await db.models.User.create({
    slug: 'zce',
    username: 'zce',
    password: await encryptor.hash('wanglei'),
    nickname: 'iceStone',
    email: 'ice@wedn.net',
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
