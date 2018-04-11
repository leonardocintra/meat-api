import { Router } from "../common/router";
import * as restify from 'restify'
import { User } from "./user-model";

class UserRouter extends Router {
  applyRoutes(application: restify.Server) {
    application.get('/users', (req, resp, next) => {
      User.findAll().then(users => {
        resp.json(users)
        return next()
      })
    })
  }
}

export const userRouter = new UserRouter()