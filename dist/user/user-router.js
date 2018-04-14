"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const user_model_1 = require("./user-model");
const restify_errors_1 = require("restify-errors");
class UserRouter extends router_1.Router {
    applyRoutes(application) {
        // GET - /Users
        application.get('/users', (req, resp, next) => {
            user_model_1.User.find()
                .then(this.render(resp, next))
                .catch(next);
        });
        // GET - /Users/1
        application.get('/users/:id', (req, resp, next) => {
            user_model_1.User.findById(req.params.id)
                .then(this.render(resp, next))
                .catch(next);
        });
        // POST /Users
        application.post('/users', (req, resp, next) => {
            let user = new user_model_1.User(req.body);
            user.save()
                .then(this.render(resp, next))
                .catch(next);
        });
        // PUT - /Users/1
        application.put('/users/:id', (req, resp, next) => {
            const options = {
                overwrite: true
            };
            user_model_1.User.update({ _id: req.params.id }, req.body, options)
                .exec()
                .then(result => {
                if (result.n) {
                    return user_model_1.User.findById(req.params.id);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado. ');
                }
            })
                .then(this.render(resp, next))
                .catch(next);
        });
        // PATH - /Users/1
        application.patch('/users/:id', (req, resp, next) => {
            const options = { new: true };
            user_model_1.User.findOneAndUpdate(req.params.id, req.body, options)
                .then(this.render(resp, next))
                .catch(next);
        });
        // DELETE - /Users/1
        application.del('/users/:id', (req, resp, next) => {
            user_model_1.User.remove({ _id: req.params.id })
                .exec()
                .then((cmdResult) => {
                if (cmdResult.n) {
                    resp.send(204);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado.');
                }
                return next();
            })
                .catch(next);
        });
    }
}
exports.userRouter = new UserRouter();
