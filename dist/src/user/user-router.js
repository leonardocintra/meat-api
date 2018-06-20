"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const user_model_1 = require("./user-model");
const model_router_1 = require("../common/model-router");
class UserRouter extends model_router_1.ModelRouter {
    constructor() {
        super(user_model_1.User);
        this.findByEmail = (req, resp, next) => {
            if (req.query.email) {
                // exemplo de como controlar a versao
                user_model_1.User.findByEmail(req.query.email)
                    .then(user => [user])
                    .then(this.renderAll(resp, next))
                    .catch(next);
            }
            else {
                next();
            }
        };
    }
    applyRoutes(application) {
        application.get(`${this.basePath}`, restify.plugins.conditionalHandler([
            { version: '1.1.3', handler: this.findAll },
            { version: '2.0.0', handler: [this.findByEmail, this.findAll] }
        ]));
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        application.post(`${this.basePath}`, this.save);
        application.put(`${this.basePath}/:id`, [this.validateId, this.replace]);
        application.patch(`${this.basePath}/:id`, [this.validateId, this.update]);
        application.del(`${this.basePath}/:id`, [this.validateId, this.delete]);
    }
}
exports.userRouter = new UserRouter();
