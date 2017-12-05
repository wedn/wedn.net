/**
 * requiresAuth
 */
const jwt = require('koa-jwt')
const config = require('../../../config')
const { User, Token } = require('../../../models')

/**
 * custom token schema
 */
const getToken = (ctx, opts) => {
  // try resolve authorization from header
  const authorization = ctx.get('authorization')
  if (authorization) {
    // parse authorization
    const info = authorization.split(' ')
    if (['Bearer', 'JWT'].includes(info[0])) return info[1]
  }
  // try resolve token from querystring
  return ctx.query.token
}

/**
 * check token status
 */
const isRevoked = async (ctx, decodedToken, token) => {
  const dbToken = await Token.findOne({ token })
  if (!dbToken) return true
  if (dbToken.user !== decodedToken.sub) return
  if (dbToken.expries < new Date()) {
    await Token.findByIdAndRemove(dbToken.id)
    return true
  }

  const user = await User.findById(dbToken.user)
  if (!user) return true

  ctx.state.user = user
  return false
}

module.exports = options => jwt(Object.assign({
  key: 'decodedToken',
  tokenKey: 'rawToken',
  passthrough: false,
  debug: process.env.NODE_ENV === 'development',
  getToken: getToken,
  isRevoked: isRevoked
}, config.jwt, options)).unless({ path: [/\/auth\//] })
