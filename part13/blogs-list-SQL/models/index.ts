import { Blog } from './blogs'
import { User } from './users'
import { ReadingLists } from './readingLists'

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingLists, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingLists, as: 'readBy' })

Blog.hasOne(ReadingLists)

export default { Blog, User, ReadingLists }
