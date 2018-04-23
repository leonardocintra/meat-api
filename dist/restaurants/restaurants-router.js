"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restaurants_model_1 = require("./restaurants-model");
const model_router_1 = require("../common/model-router");
class RestaurantRouter extends model_router_1.ModelRouter {
    constructor() {
        super(restaurants_model_1.Restaurant);
    }
    applyRoutes(application) {
        application.get('/restaurants', this.findAll);
        application.get('/restaurants/:id', [this.validateId, this.findById]);
        application.post('/restaurants', this.save);
        application.put('/restaurants/:id', [this.validateId, this.replace]);
        application.patch('/restaurants/:id', [this.validateId, this.update]);
        application.del('/restaurants/:id', [this.validateId, this.delete]);
    }
}
exports.restaurantRouter = new RestaurantRouter();
