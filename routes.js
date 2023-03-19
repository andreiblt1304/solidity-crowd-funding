const routes = require('next-routes')();

routes
    .add('/crowdfunds/new', '/crowdfunds/new')
    .add('/crowdfunds/:address', '/crowdfunds/show');

module.exports = routes;