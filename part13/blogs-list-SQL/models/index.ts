import { Blog } from './blogs'
import { User } from './users'
import { Readings } from './readings'
import { ReadingLists } from './readingLists'

User.hasMany(Blog)
Blog.belongsTo(User)

Readings.belongsToMany(Blog, { through: ReadingLists })
Blog.belongsToMany(Readings, { through: ReadingLists })

User.hasOne(Readings)
Readings.belongsTo(User)

export default { Blog, User, Readings, ReadingLists }
