/**
 * JSON Web Token
 */
import jwt from 'koa-jwt'

export default app => jwt({
  secret: app.config.jwt.secretOrKey,
  issuer: app.config.jwt.issuer,
  audience: app.config.jwt.audience,
  key: 'jwtdata'
})
