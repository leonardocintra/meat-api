import { Router } from "./router"
import * as mongoose from 'mongoose'
import { NotFoundError } from "restify-errors";

export abstract class ModelRouter<D extends mongoose.Document> extends Router {
  
  basePath: string
  pageSize: number = 4

  constructor(protected model: mongoose.Model<D>) {
    super()
    this.basePath = `/${model.collection.name}`
  }

  protected prepareOne(query: mongoose.DocumentQuery<D, D>) : mongoose.DocumentQuery<D, D> {
    return query
  }

  envelope(document: any): any {
    let resoruce = Object.assign({_links:{}}, document.toJSON())
    resoruce._links.self = `${this.basePath}/${resoruce._id}`
    return resoruce
  }

  envelopeAll(documents: any[], options: any = {}): any {
    const resoruce: any = {
      _links: {
        self: `${options.url}`
      },
      items: documents
    }

    if (options.page && options.count && options.pageSize) {
      if (options.page > 1) {
        resoruce._links.previous = `${this.basePath}?_page=${options.page - 1}`
      }
      
      const remaining = options.count - (options.page * options.pageSize)
      if (remaining > 0) {
        resoruce._links.next = `${this.basePath}?_page=${options.page + 1}`
      }
    }

    return resoruce
  }

  validateId = (req, resp, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      next(new NotFoundError('Document not found'))
    } else {
      next()
    }
  }

  findAll = (req, resp, next) => {
    let page = parseInt(req.query._page || 1)
    page = page > 0 ? page : 1

    const skip = (page - 1) * this.pageSize

    this.model.count({})
      .exec()
      .then(count => this.model.find()
        .skip(skip)
        .limit(this.pageSize)
        .then(this.renderAll(resp, next, { 
          page, count, pageSize: this.pageSize, url: req.url 
        }))
      )
      .catch(next)
  }

  findById = (req, resp, next) => {
    this.prepareOne(this.model.findById(req.params.id))
      .then(this.render(resp, next))
      .catch(next)
  }

  save =  (req, resp, next) => {
    let document = new this.model(req.body)
    document.save()
      .then(this.render(resp, next))
      .catch(next)
  }

  replace = (req, resp, next) => {
    const options =  {
      runValidators: true,
      overwrite: true 
    }
    this.model.update({_id: req.params.id }, req.body, options)
      .exec()
      .then(
        result => {
          if(result.n) {
            return this.prepareOne(this.model.findById(req.params.id))
          } else {
            throw new NotFoundError('Documento não encontrado. ')
          }
        }
      )
      .then(this.render(resp, next))
      .catch(next)
  }

  update = (req, resp, next) => {
    const options = { 
      runValidators: true,
      new: true 
    }
    this.model.findByIdAndUpdate(req.params.id, req.body, options)
      .then(this.render(resp, next))
      .catch(next)
  }

  delete = (req, resp, next) => {
    this.model.remove({_id:req.params.id})
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
  }
}