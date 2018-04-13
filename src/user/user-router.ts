import * as restify from 'restify'
import { Router } from "../common/router";
import { User } from "./user-model";

class UserRouter extends Router {
  applyRoutes(application: restify.Server) {
    
    // GET - /Users
    application.get('/users', (req, resp, next) => {
      User.find().then(users => {
        resp.json(users)
        return next()
      })
    })

    // GET - /Users/1
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

    // POST /Users
    application.post('/users', (req, resp, next) => {
      let user = new User(req.body)
      user.save().then(user => {
        resp.json(user)
        return next()
      })
    })
  }
}

export const userRouter = new UserRouter()