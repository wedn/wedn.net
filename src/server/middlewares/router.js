/**
 * 动态路由解析
 */
import glob from 'glob'
import compose from 'koa-compose'

export default app => {
  const routes = glob
    // .sync('../controllers/**/*.js', { cwd: __dirname })
    // .sync('../controllers/*', { cwd: __dirname })
    .sync('../controllers/{*,**/index}.js', { cwd: __dirname })
    .map(require)
    .map(item => item && item.router && item.router.routes())
    .filter(item => typeof item === 'function')
  return compose(routes)
}
