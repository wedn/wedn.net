/**
 * 账户认证
 * https://gist.github.com/vesse/453b2940065e751cfdfe
 * http://www.cnblogs.com/binyue/p/4812798.html
 */
const compose = require('koa-compose')
const passport = require('koa-passport')
const { Strategy: LocalStrategy } = require('passport-local')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const { User } = require('../models')

module.exports = app => {
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
    session: true
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
    // // ExtractJwt.fromAuthHeader(),
    jwtFromRequest: ExtractJwt.versionOneCompatibility({
      tokenBodyField: 'token',
      tokenQueryParameterName: 'token',
      authScheme: 'JWT'
    }),
    secretOrKey: app.config.jwt.secretOrKey,
    issuer: app.config.jwt.issuer,
    audience: app.config.jwt.audience
  }
  passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await User.getBySlug(payload.sub)
      if (user) return done(null, user)
      return done(null, false)
    } catch (e) {
      return done(e)
    }
  }))
  passport.jwt = (callback) => (ctx, next) => passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      ctx.body = { status: ctx.status = 500, errors: ['Error occurred.'] }
      return
    }
    if (!user) {
      ctx.body = { status: ctx.status = 401, errors: ['Invalid token.'] }
      return
    }
    return callback ? callback(ctx, next, user) : next()
  })(ctx, next)

  // ## Middlewares
  const middlewares = []

  middlewares.push(passport.initialize())
  middlewares.push(passport.session())

  return compose(middlewares)
}
