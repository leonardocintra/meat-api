import { Router } from "../common/router";
import * as restify from 'restify'
import { User } from "./user-model";

class UserRouter extends Router {
  applyRoutes(application: restify.Server) {
    
    // GET - /User
    application.get('/users', (req, resp, next) => {
      User.find().then(users => {
        resp.json(users)
        return next()
      })
    })

    // GET - /User/1
    application.get('/users/:id', (req, resp, next) => {
      User.findById(req.params.id).then(user => {
        if(user) {
          resp.json(user)
          return next()
        }

        resp.send(404)
        return next()
      })
    })
  }
}

export const userRouter = new UserRouter()