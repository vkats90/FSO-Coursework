import { Blog } from './blogs'
import { User } from './users'

User.hasMany(Blog)
Blog.belongsTo(User)

export default { Blog, User }
