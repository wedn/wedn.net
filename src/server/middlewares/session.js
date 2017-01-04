/**
 * 会话支持
 * TODO：[Legacy middleware]
 */
import session from 'koa-session'

export default app => session(app.config.session, app)
