/**
 * 账户认证
 */
import compose from 'koa-compose'
import passport from 'koa-passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { User } from '../models'

export default app => {
  const middlewares = []

  passport.serializeUser((user, callback) => {
    callback(null, user.slug)
  })

  passport.deserializeUser((slug, callback) => {
    User.getBySlug(slug)
      .then(user => callback(null, user))
      .catch(err => callback(err))
  })

  passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.getByUnique(username)
      if (!user) {
        return done(null, false, { message: '用户名不存在！' })
      }
      if (!await user.validPassword(password)) {
        return done(null, false, { message: '密码不匹配！' })
      }
      return done(null, user)
    } catch (e) {
      return done(e)
    }
  }))

  middlewares.push(passport.initialize())
  middlewares.push(passport.session())

  return compose(middlewares)
}
