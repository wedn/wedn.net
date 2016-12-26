/**
 * 会话支持
 * TODO：[Legacy middleware]
 */
import convert from 'koa-convert'
import session from 'koa-session'

export default app => convert(session(app.config.session, app))
