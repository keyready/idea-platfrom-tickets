const fs = require('fs');
const path = require('path');

const jsonServer = require('json-server');

const server = jsonServer.create();
const PORT = 5000;
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

server.use(async (req, res, next) => {
    await new Promise((res) => {
        setTimeout(res, 500);
    });
    next();
});

// eslint-disable-next-line
server.use(router);

server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on http://localhost:${PORT}`);
});
