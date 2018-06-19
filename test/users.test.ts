import 'jest'
import * as request from 'supertest'
import { Server } from '../src/server/server'
import { environment } from '../src/common/environment'
import { userRouter } from '../src/user/user-router'
import { User } from '../src/user/user-model'

let address: string
let server: Server

beforeAll(() => {
  environment.db.url = process.env.DB_URL || 'mongodb://githubtest:loja200test@ds018268.mlab.com:18268/meatdb-test'
  environment.server.port = process.env.SERVER_PORT || 3001
  
  address = `http://localhost:${environment.server.port}`
  server = new Server()
  return server
    .bootstrap([userRouter])
    .then(() => User.remove({}).exec())
    .catch(console.error)
})

test('return 200 HTTP status for GET /users', () => {
  return request(address)
    .get('/users')
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.body.items).toBeInstanceOf(Array)
    }).catch(fail)
})

test('return 200 HTTP status for POST /users', () => {
  return request(address)
    .post('/users')
    .send({
      name: 'usuario1',
      email: 'usuario1@gmail.com',
      password: '1234567',
      cpf: '13242418450'
    })
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.body._id).toBeDefined()
      expect(response.body.name).toBe('usuario1')
      expect(response.body.email).toBe('usuario1@gmail.com')
      //expect(response.body.password).toBeUndefined()
      expect(response.body.cpf).toBe('13242418450')
    }).catch(fail)
})

afterAll(() => {
  return server.shutdown()
})