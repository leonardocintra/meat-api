"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const user_router_1 = require("./user/user-router");
const restaurants_router_1 = require("./restaurants/restaurants-router");
const server = new server_1.Server();
server.bootstrap([user_router_1.userRouter, restaurants_router_1.restaurantRouter]).then(server => {
    console.log('Server is listening on:', server.application.address());
}).catch(error => {
    console.log('Server failed to start');
    console.error(error);
    process.exit(1);
});
