const path = require('path')

module.exports = {
  env: process.env.NODE_ENV || 'development',
  paths: {
    root: __dirname,
    source: path.join(__dirname, 'src/client'),
    static: path.join(__dirname, 'content/static'),
    output: path.join(__dirname, 'dist/client'),
    publicPath: '/',
    assets: 'assets',
    index: path.join(__dirname, 'dist/client/index.html'),
    // just for gh-pages
    // notfound: path.join(__dirname, 'dist/404.html')
  },
  server: {
    port: process.env.PORT || 2080,
    proxy: {
      '/v2': {
        target: 'https://api.douban.com/',
        changeOrigin: true,
        secure: false
      }
    }
  },
  sourceMap: { js: true, css: true }
}
