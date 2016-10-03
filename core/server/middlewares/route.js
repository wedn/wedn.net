import glob from 'glob'
import compose from 'koa-compose'

const routes = glob
  .sync('../controllers/**/*.js', { cwd: __dirname })
  .map(require)
  .map(item => item.router)
  .map(item => item.routes())

export default () => compose(routes)
