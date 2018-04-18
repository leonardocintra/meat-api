import * as restify from 'restify'
import { Router } from "../common/router";
import { User } from "./user-model";
import { NotFoundError } from 'restify-errors';

class UserRouter extends Router {

  applyRoutes(application: restify.Server) {
    
    // GET - /Users
    application.get('/users', (req, resp, next) => {
      User.find()
        .then(this.render(resp, next))
        .catch(next)
    })

    // GET - /Users/1
    application.get('/users/:id', (req, resp, next) => {
      User.findById(req.params.id)
        .then(this.render(resp, next))
        .catch(next)
    })

    // POST /Users
    application.post('/users', (req, resp, next) => {
      let user = new User(req.body)
      user.save()
        .then(this.render(resp, next))
        .catch(next)
    })

    // PUT - /Users/1
    application.put('/users/:id', (req, resp, next) => {
      const options =  {
        runValidators: true,
        overwrite: true 
      }
      User.update({_id: req.params.id }, req.body, options)
        .exec()
        .then(
          result => {
            if(result.n) {
              return User.findById(req.params.id)
            } else {
              throw new NotFoundError('Documento não encontrado. ')
            }
          }
        )
        .then(this.render(resp, next))
        .catch(next)
    })

    // PATH - /Users/1
    application.patch('/users/:id', (req, resp, next) => {
      const options = { 
        runValidators: true,
        new: true 
      }
      User.findByIdAndUpdate(req.params.id, req.body, options)
        .then(this.render(resp, next))
        .catch(next)
    })

    // DELETE - /Users/1
    application.del('/users/:id', (req, resp, next) => {
      User.remove({_id:req.params.id})
        .exec()
        .then((cmdResult: any) => {
          if(cmdResult.n){
            resp.send(204)          
          } else {
            throw new NotFoundError('Documento não encontrado.')
          }
          return next()
        })
        .catch(next)
    })
  }
}

export const userRouter = new UserRouter()