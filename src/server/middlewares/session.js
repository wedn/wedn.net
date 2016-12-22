// TODO：[Legacy middleware]
import convert from 'koa-convert'
import session from 'koa-session'

export default (config, app) => convert(session(config.session, config.app))
