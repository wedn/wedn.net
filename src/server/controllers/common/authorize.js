import { user_roles } from '../../constants'

export default (role) => async (ctx, next) => {
  if (!ctx.session.user) {
    // 没有登录
    return ctx.redirect('/account/login?redirect=' + querystring.escape(ctx.url))
  }
  if (user_roles.indexOf(ctx.session.user.role) > user_roles.indexOf(role)) {
    // 不是管理员
    return ctx.redirect('/')
  }
  // OK
  return next()
}
