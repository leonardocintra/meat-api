import { Router } from "../common/router";
import * as restify from 'restify'

class UserRouter extends Router {
  applyRoutes(application: restify.Server) {
    application.get('/users', (req, resp, next) => {
      resp.json({
        message: 'users router'
      })
    })
  }
}

export const userRouter = new UserRouter()