/**
 * Api app routes
 * http://guides.rubyonrails.org/routing.html
 * http://restfulrouting.com/
 */

const Router = require('koa-router')
const compose = require('koa-compose')

const wrap = require('./wrap')

/**
 * Utils functions
 */

const loadController = path => wrap(require(path))

const mapResource = (name, controller) => {
  router.get(`/${name}`, controller.index)
  router.get(`/${name}/new`, controller.new)
  router.post(`/${name}`, controller.create)
  router.get(`/${name}/:id`, controller.show)
  router.get(`/${name}/:id/edit`, controller.edit)
  router.put(`/${name}/:id`, controller.update)
  router.delete(`/${name}/:id`, controller.destroy)
}

/**
 * load all controllers
 */

const postController = loadController('../controllers/post')
const termController = loadController('../controllers/term')
const userController = loadController('../controllers/user')
const commentController = loadController('../controllers/comment')
const authController = loadController('../controllers/auth')

/**
 * create router for app
 */

const router = new Router()

/**
 * map router rules
 */
// posts
mapResource('posts', postController)

// terms
mapResource('terms', termController)

// users
mapResource('users', userController)

// comments
mapResource('comments', commentController)

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
