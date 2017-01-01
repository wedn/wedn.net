import querystring from 'querystring'
import { USER_ROLES } from '../../libraries/constants'

export default (role) => async (ctx, next) => {
  if (!ctx.session.user) {
    // 没有登录
    return ctx.redirect('/account/login?redirect=' + querystring.escape(ctx.url))
  }
  if (USER_ROLES.indexOf(ctx.session.user.role) > USER_ROLES.indexOf(role)) {
    // 不是管理员
    return ctx.redirect('/')
  }
  // OK
  return next()
}
