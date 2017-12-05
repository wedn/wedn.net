/**
 * module dependencies
 */

const compose = require('koa-compose')
const Router = require('koa-router')
const wrap = require('./wrap')

/**
 * load all controllers
 */

const load = path => wrap(require(path))

const postController = load('../controllers/post')
const userController = load('../controllers/user')
const authController = load('../controllers/auth')

/**
 * create router for app
 */

const router = new Router()

/**
 * map router rules
 */

// posts
router.get('/posts', postController.index)
router.post('/posts', postController.create)

// users
router.get('/users', userController.index)
router.post('/users', userController.create)

// authentication
router.post('/auth/token', authController.token)
router.post('/auth/revoke', authController.revoke)

/**
 * export router routes
 */

module.exports = compose([
  router.routes(),
  router.allowedMethods()
])

// # API

// ## Endpoints

// - authentication
//   - token
//   - revoke
//   - reset
// - configuration
//   - index
//   - private
// - settings
// - uploads
// - <post-type>
//   - revisions
// - users
//   - me
// - <taxonomy>
// - comments
// - media
// - roles
// - types
// - slugs
// - themes
// - clients
// - notifications
