"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jestCli = require("jest-cli");
const server_1 = require("./src/server/server");
const environment_1 = require("./src/common/environment");
const user_router_1 = require("./src/user/user-router");
const reviews_router_1 = require("./src/reviews/reviews-router");
const user_model_1 = require("./src/user/user-model");
const reviews_model_1 = require("./src/reviews/reviews-model");
let server;
const beforeAllTests = () => {
    environment_1.environment.db.url = process.env.DB_URL || 'mongodb://githubtest:loja200test@ds018268.mlab.com:18268/meatdb-test';
    environment_1.environment.server.port = process.env.SERVER_PORT || 3001;
    server = new server_1.Server();
    return server
        .bootstrap([
        user_router_1.userRouter,
        reviews_router_1.reviewsRouter
    ])
        .then(() => user_model_1.User.remove({}).exec())
        .then(() => reviews_model_1.Review.remove({}).exec());
};
const afterAllTests = () => {
    return server.shutdown();
};
beforeAllTests()
    .then(() => jestCli.run())
    .then(() => afterAllTests())
    .catch(console.error);
