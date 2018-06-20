import * as jestCli from 'jest-cli'

import { Server } from './src/server/server'
import { environment } from './src/common/environment'
import { userRouter } from './src/user/user-router'
import { reviewsRouter } from './src/reviews/reviews-router'
import { User } from './src/user/user-model'
import { Review } from './src/reviews/reviews-model'

let server: Server

const beforeAllTests = () => {
  environment.db.url = process.env.DB_URL || 'mongodb://githubtest:loja200test@ds018268.mlab.com:18268/meatdb-test'
  environment.server.port = process.env.SERVER_PORT || 3001

  server = new Server()
  return server
    .bootstrap([
      userRouter,
      reviewsRouter
    ])
    .then(() => User.remove({}).exec())
    .then(() => Review.remove({}).exec())
}

const afterAllTests = () => {
  return server.shutdown()
}

beforeAllTests()
  .then(() => jestCli.run())
  .then(() => afterAllTests())
  .catch(console.error)