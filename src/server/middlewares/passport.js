/**
 * 账户认证
 * https://gist.github.com/vesse/453b2940065e751cfdfe
 * http://www.cnblogs.com/binyue/p/4812798.html
 */
import compose from 'koa-compose'
import passport from 'koa-passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { User } from '../models'

export default app => {
  // ## Passport configure
  passport.serializeUser((user, callback) => {
    callback(null, user.slug)
  })
  passport.deserializeUser((slug, callback) => {
    User.getBySlug(slug)
      .then(user => callback(null, user))
      .catch(err => callback(err))
  })

  const localOptions = {
    usernameField: 'username',
    passwordField: 'password',
    session: false
  }
  passport.use(new LocalStrategy(localOptions, async (username, password, done) => {
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

  const jwtOptions = {
    // 兼容 body 和 header
    jwtFromRequest: ExtractJwt.versionOneCompatibility({
      tokenBodyField: 'token'
    }), // ExtractJwt.fromAuthHeader(),
    secretOrKey: app.config.jwt.secretOrKey,
    issuer: app.config.jwt.issuer,
    audience: app.config.jwt.audience
  }
  passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await User.getBySlug(payload.sub)
      if (user) return done(null, user)
      return done(null, false, { message: '用户不存在！' })
    } catch (e) {
      return done(e)
    }
  }))

  // ## Middlewares
  const middlewares = []

  middlewares.push(passport.initialize())
  middlewares.push(passport.session())

  return compose(middlewares)
}
