"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const reviews_model_1 = require("./reviews-model");
class ReviewsRouter extends model_router_1.ModelRouter {
    constructor() {
        super(reviews_model_1.Review);
    }
    envelope(document) {
        let resource = super.envelope(document);
        const restId = document.restaurant._id ? document.restaurant._id : document.restaurant;
        resource._links.restaurant = `/restaurants/${restId}`;
        return resource;
    }
    prepareOne(query) {
        return query.populate('user', 'name').populate('restaurant', 'name');
    }
    applyRoutes(application) {
        application.get(`${this.basePath}`, this.findAll);
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        application.post(`${this.basePath}`, this.save);
    }
}
exports.reviewsRouter = new ReviewsRouter();
