import * as restify from 'restify'
import { User } from "./user-model";
import { NotFoundError } from 'restify-errors';
import { ModelRouter } from '../common/model-router';

class UserRouter extends ModelRouter<User> {

  constructor() {
    super(User);
  }

  applyRoutes(application: restify.Server) {
    
    // GET - /Users
    application.get('/users', this.findAll)
    // GET - /Users/1
    application.get('/users/:id', this.findById)
    // POST /Users
    application.post('/users', this.save)
    // PUT - /Users/1
    application.put('/users/:id', this.replace)
    // PATH - /Users/1
    application.patch('/users/:id', this.update)
    // DELETE - /Users/1
    application.del('/users/:id', this.delete)
  }
}

export const userRouter = new UserRouter()