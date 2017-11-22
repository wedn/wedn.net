const compose = require('koa-compose')
const Router = require('koa-router')

// require all controllers
const postController = require('./controllers/post')

// create router for app
const router = new Router()

// map router rules
router.get('/posts', postController.index)
router.post('/posts', postController.add)

// export router routes
module.exports = compose([
  router.routes(),
  router.allowedMethods()
])
