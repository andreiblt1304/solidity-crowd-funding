//in order to apply the route changes, you have to restart the server
const routes = require('next-routes')();

routes
    .add('/crowdfunds/new', '/crowdfunds/new')
    .add('/crowdfunds/:address', '/crowdfunds/show')
    .add('/crowdfunds/:address/requests', '/crowdfunds/requests/index')
    .add('/crowdfunds/:address/requests/new', '/crowdfunds/requests/new');

module.exports = routes;