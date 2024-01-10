let jsonServer = require('json-server');
let server = jsonServer.create();
let router = jsonServer.router('db.json');
let middleware = jsonServer.defaults();


server.use(middleware);
server.use(router);
server.listen(3000, () => {
    console.log('JSON server is running')
})