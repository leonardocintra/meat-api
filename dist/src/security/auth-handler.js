"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("./../user/user-model");
const restify_errors_1 = require("restify-errors");
exports.authenticate = (req, resp, next) => {
    const { email, password } = req.body;
    user_model_1.User.findByEmail(email, '+password')
        .then(user => {
        if (user && user.matches(password)) {
            // gerar o token
        }
        else {
            return next(new restify_errors_1.NotAuthorizedError('Invalid Credentials'));
        }
    })
        .catch(next);
};
