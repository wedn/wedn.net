/**
 * Session support
 */
const session = require('koa-session')

module.exports = app => session(app.config.session, app)
