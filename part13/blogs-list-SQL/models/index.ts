import { Blog } from './blogs'
import { User } from './users'
import { ReadingLists } from './readingLists'
import { activeSessions } from './activeSessions'

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingLists, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingLists, as: 'readBy' })

Blog.hasOne(ReadingLists)

activeSessions.hasMany(User)
User.belongsTo(activeSessions)

export default { Blog, User, ReadingLists, activeSessions }
