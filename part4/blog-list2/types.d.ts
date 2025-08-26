import type { UserType } from './types'

declare global {
  namespace Express {
    interface Request {
      user?: Omit<UserType, 'id', 'passwordhash'>
    }
  }
}
