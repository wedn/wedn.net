const pages = [
  require('./pages/dashboard'),
  require('./pages/about'),
]

export default pages.map(page => ({ name: page.name, path: page.path, component: page }))
