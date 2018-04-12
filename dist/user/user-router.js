"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const user_model_1 = require("./user-model");
class UserRouter extends router_1.Router {
    applyRoutes(application) {
        // GET - /User
        application.get('/users', (req, resp, next) => {
            user_model_1.User.find().then(users => {
                resp.json(users);
                return next();
            });
        });
        // GET - /User/1
        application.get('/users/:id', (req, resp, next) => {
            user_model_1.User.findById(req.params.id).then(user => {
                if (user) {
                    resp.json(user);
                    return next();
                }
                resp.send(404);
                return next();
            });
        });
    }
}
exports.userRouter = new UserRouter();
