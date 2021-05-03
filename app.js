const http = require('http');
const uf = require('./UserFaker.js');

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res) => {
    res.statusCode = 200;

    content = uf.get_user();

    res.setHeader('username', content.username);
    res.setHeader('email', content.email);
    res.setHeader('password', content.password);

    res.end(JSON.stringify(content));
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});