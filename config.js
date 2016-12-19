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
    port: process.env.PORT || 1080,
    proxy: {
      '/api': {
        target: 'http://localhost:2080/',
        changeOrigin: true,
        secure: false
      }
    }
  },
  sourceMap: { js: true, css: true }
}
