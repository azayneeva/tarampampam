const routes = require('next-routes')();

routes
    .add('/projects/new', '/projects/new')
    .add('/projects/:address', '/projects/show')
    .add('/projects/:address/tasks', '/projects/tasks/index')
    .add('/projects/:address/tasks/new', '/projects/tasks/new')

module.exports = routes;