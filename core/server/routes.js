const compose = require('koa-compose')
const Router = require('koa-router')

// require all controllers
const homeController = require('./controllers/home')

// create router for app
const router = new Router()

// map router rules
router.get('/', homeController.index)
router.get('/about', homeController.about)
router.get('/contact', homeController.contact)
router.get('/throw', homeController.throw)

// export router routes
module.exports = compose([
  router.routes(),
  router.allowedMethods()
])

// ================================================================

// router.get('/', async (ctx, next) => {
//   console.log(111)
//   await next()
// }, async (ctx, next) => {
//   console.log(222)
//   await next()
// })
