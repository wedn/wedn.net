import glob from 'glob'
import compose from 'koa-compose'

const routes = glob
  .sync('../controllers/**/*.js', { cwd: __dirname })
  .map(require)
  .map(item => item && item.router && item.router.routes())
  .filter(item => typeof item === 'function')

export default app => compose(routes)
