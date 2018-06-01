import * as restify from 'restify'
import { User } from "./user-model"
import { NotFoundError } from 'restify-errors'
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
      .then(this.renderAll(resp, next))
      .catch(next)
    } else {
      next()
    }
  }

  applyRoutes(application: restify.Server) {

    application.get('/users', restify.plugins.conditionalHandler([
      { version: '1.1.3', handler: this.findAll },
      { version: '2.0.0', handler: [this.findByEmail, this.findAll] }
    ]));

    application.get('/users/:id', [this.validateId, this.findById])
    application.post('/users', this.save)
    application.put('/users/:id', [this.validateId, this.replace])
    application.patch('/users/:id', [this.validateId, this.update])
    application.del('/users/:id', [this.validateId, this.delete])
  }
}

export const userRouter = new UserRouter()