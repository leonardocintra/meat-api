import * as restify from 'restify'
import { Router } from "../common/router";
import { User } from "./user-model";

class UserRouter extends Router {

  /* // Nao precisei user esse constructor pois no moodel o select esta = false
 constructor() {
   super()
   this.on('beforeRender', document => {
     document.password = undefined
   })
 }
 */

  applyRoutes(application: restify.Server) {
    
    // GET - /Users
    application.get('/users', (req, resp, next) => {
      User.find()
        .then(this.render(resp, next))
    })

    // GET - /Users/1
    application.get('/users/:id', (req, resp, next) => {
      User.findById(req.params.id)
        .then(this.render(resp, next))
    })

    // POST /Users
    application.post('/users', (req, resp, next) => {
      let user = new User(req.body)
      user.save()
        .then(this.render(resp, next))
    })

    // PUT - /Users/1
    application.put('/users/:id', (req, resp, next) => {
      const options =  { 
        overwrite: true 
      }
      User.update({_id: req.params.id }, req.body, options)
        .exec()
        .then(
          result => {
            if(result.n) {
              return User.findById(req.params.id)
            } else {
              resp.send(404)
            }
          }
        )
        .then(this.render(resp, next))
        .catch(
        )
    })

    // PATH - /Users/1
    application.patch('/users/:id', (req, resp, next) => {
      const options = { new: true}
      User.findOneAndUpdate(req.params.id, req.body, options)
        .then(this.render(resp, next))
    })

    // DELETE - /Users/1
    application.del('/users/:id', (req, resp, next) => {
      User.remove({_id:req.params.id}).exec().then((cmdResult: any) => {
        if(cmdResult.n){
          resp.send(204)          
        } else {
          resp.send(404)
        }
        return next()
      })
    })
  }
}

export const userRouter = new UserRouter()