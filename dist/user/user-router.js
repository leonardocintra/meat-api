"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("./user-model");
const model_router_1 = require("../common/model-router");
class UserRouter extends model_router_1.ModelRouter {
    constructor() {
        super(user_model_1.User);
    }
    applyRoutes(application) {
        // GET - /Users
        application.get('/users', this.findAll);
        // GET - /Users/1
        application.get('/users/:id', this.findById);
        // POST /Users
        application.post('/users', this.save);
        // PUT - /Users/1
        application.put('/users/:id', this.replace);
        // PATH - /Users/1
        application.patch('/users/:id', this.update);
        // DELETE - /Users/1
        application.del('/users/:id', this.delete);
    }
}
exports.userRouter = new UserRouter();
