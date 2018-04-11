"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const server = restify.createServer({
    name: 'meat-api',
    version: '1.0.0'
});
server.get('/hello', (req, resp, next) => {
    resp.json({
        message: 'Ola, deu certo!'
    });
    return next();
});
server.listen(3000, () => {
    console.log('API is running on http://localhost:3000');
});
