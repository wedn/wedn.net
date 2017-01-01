/**
 * 账户认证
 */
import compose from 'koa-compose'
import passport from 'koa-passport'
import { Strategy as LocalStrategy } from 'passport-local'

const user = {
  id: 1000,
  username: 'user',
  password: 'password'
}

function findUser (username, callback) {
  console.log(username)
  if (username === user.username) {
    return callback(null, user)
  }
  return callback(null)
}


export default app => {
  const middlewares = []

  passport.serializeUser((user, callback) => callback(null, user.username))
  passport.deserializeUser((username, callback) => findUser(username, callback))

  passport.use(new LocalStrategy((username, password, done) => {
    findUser(username, function (err, user) {
      if (err) return done(err)
      if (!user || password !== user.password) return done(null, false)
      return done(null, user)
    })
  }))

  middlewares.push(passport.initialize())
  middlewares.push(passport.session())

  return compose(middlewares)
}
