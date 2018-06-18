const routes = module.exports = require('next-routes')()

routes
  .add('index', '/')
  .add('edit', '/edit/:id')
  .add('band', '/bands/:slug', '/band')
