import { Blog } from './blogs'
import { User } from './users'

Blog.sync({ alter: true })
User.sync({ alter: true })

export default { Blog, User }
