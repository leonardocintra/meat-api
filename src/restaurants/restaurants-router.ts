import { Restaurant } from './restaurants-model'
import * as restify from 'restify'
import { NotFoundError } from 'restify-errors'
import { ModelRouter } from '../common/model-router'

class RestaurantRouter extends ModelRouter<Restaurant> {
  constructor() {
    super(Restaurant);
  }

  applyRoutes(application: restify.Server) {
    application.get('/restaurants', this.findAll)
    application.get('/restaurants/:id', [this.validateId, this.findById])
    application.post('/restaurants', this.save)
    application.put('/restaurants/:id', [this.validateId, this.replace])
    application.patch('/restaurants/:id', [this.validateId, this.update])
    application.del('/restaurants/:id', [this.validateId, this.delete])
  }
}

export const restaurantRouter = new RestaurantRouter()