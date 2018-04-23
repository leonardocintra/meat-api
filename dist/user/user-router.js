"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("./user-model");
const model_router_1 = require("../common/model-router");
class UserRouter extends model_router_1.ModelRouter {
    constructor() {
        super(user_model_1.User);
    }
    applyRoutes(application) {
        application.get('/users', this.findAll);
        application.get('/users/:id', [this.validateId, this.findById]);
        application.post('/users', this.save);
        application.put('/users/:id', [this.validateId, this.replace]);
        application.patch('/users/:id', [this.validateId, this.update]);
        application.del('/users/:id', [this.validateId, this.delete]);
    }
}
exports.userRouter = new UserRouter();
