import { User } from './user/user-model'

declare module 'restify' {
  export interface Request {
    authenticated: User
  }
}