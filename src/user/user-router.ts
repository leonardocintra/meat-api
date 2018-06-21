import { authenticate } from './../security/auth-handler';
import * as restify from 'restify'
import { User } from "./user-model"
import { ModelRouter } from '../common/model-router'

class UserRouter extends ModelRouter<User> {

  constructor() {
    super(User);
  }

  findByEmail = (req, resp, next) => {
    if (req.query.email) {
      // exemplo de como controlar a versao
      User.findByEmail(req.query.email)
      .then(user => [user])
      .then(this.renderAll(resp, next, {
        pageSize: this.pageSize,
        url: req.url
      }))
      .catch(next)
    } else {
      next()
    }
  }

  applyRoutes(application: restify.Server) {

    application.get(`${this.basePath}`, restify.plugins.conditionalHandler([
      { version: '1.1.3', handler: this.findAll },
      { version: '2.0.0', handler: [this.findByEmail, this.findAll] }
    ]));

    application.get(`${this.basePath}/:id`, [this.validateId, this.findById])
    application.post(`${this.basePath}`, this.save)
    application.put(`${this.basePath}/:id`, [this.validateId, this.replace])
    application.patch(`${this.basePath}/:id`, [this.validateId, this.update])
    application.del(`${this.basePath}/:id`, [this.validateId, this.delete])

    application.post(`${this.basePath}/authenticate`, authenticate)
  }
}

export const userRouter = new UserRouter()