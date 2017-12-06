/**
 * module dependencies
 */

const Router = require('koa-router')
const compose = require('koa-compose')

const wrap = require('./wrap')

/**
 * load all controllers
 */

const load = path => wrap(require(path))

const postController = load('../controllers/post')
const termController = load('../controllers/term')
const userController = load('../controllers/user')
const commentController = load('../controllers/comment')
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
router.get('/posts/new', postController.new)
router.post('/posts', postController.create)
router.get('/posts/:id', postController.show)
router.get('/posts/:id/edit', postController.edit)
router.put('/posts/:id', postController.update)
router.delete('/posts/:id', postController.destroy)

// terms
router.get('/terms', termController.index)
router.get('/terms/new', termController.new)
router.post('/terms', termController.create)
router.get('/terms/:id', termController.show)
router.get('/terms/:id/edit', termController.edit)
router.put('/terms/:id', termController.update)
router.delete('/terms/:id', termController.destroy)

// users
router.get('/users', userController.index)
router.get('/users/new', userController.new)
router.post('/users', userController.create)
router.get('/users/:id', userController.show)
router.get('/users/:id/edit', userController.edit)
router.put('/users/:id', userController.update)
router.delete('/users/:id', userController.destroy)

// comments
router.get('/comments', commentController.index)
router.get('/comments/new', commentController.new)
router.post('/comments', commentController.create)
router.get('/comments/:id', commentController.show)
router.get('/comments/:id/edit', commentController.edit)
router.put('/comments/:id', commentController.update)
router.delete('/comments/:id', commentController.destroy)

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

// http://guides.rubyonrails.org/routing.html
// http://restfulrouting.com/
