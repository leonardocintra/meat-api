"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const user_model_1 = require("./user-model");
class UserRouter extends router_1.Router {
    /* // Nao precisei user esse constructor pois no moodel o select esta = false
   constructor() {
     super()
     this.on('beforeRender', document => {
       document.password = undefined
     })
   }
   */
    applyRoutes(application) {
        // GET - /Users
        application.get('/users', (req, resp, next) => {
            user_model_1.User.find()
                .then(this.render(resp, next));
        });
        // GET - /Users/1
        application.get('/users/:id', (req, resp, next) => {
            user_model_1.User.findById(req.params.id)
                .then(this.render(resp, next));
        });
        // POST /Users
        application.post('/users', (req, resp, next) => {
            let user = new user_model_1.User(req.body);
            user.save()
                .then(this.render(resp, next));
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
                    resp.send(404);
                }
            })
                .then(this.render(resp, next))
                .catch();
        });
        // PATH - /Users/1
        application.patch('/users/:id', (req, resp, next) => {
            const options = { new: true };
            user_model_1.User.findOneAndUpdate(req.params.id, req.body, options)
                .then(this.render(resp, next));
        });
        // DELETE - /Users/1
        application.del('/users/:id', (req, resp, next) => {
            user_model_1.User.remove({ _id: req.params.id }).exec().then((cmdResult) => {
                if (cmdResult.n) {
                    resp.send(204);
                }
                else {
                    resp.send(404);
                }
                return next();
            });
        });
    }
}
exports.userRouter = new UserRouter();
