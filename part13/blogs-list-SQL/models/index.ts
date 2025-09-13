import { Blog } from './blogs'
import { User } from './users'

User.hasMany(Blog)
Blog.belongsTo(User)
Blog.sync({ alter: true })
User.sync({ alter: true })

export default { Blog, User }
