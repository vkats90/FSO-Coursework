import models from './models'
import bcrypt from 'bcrypt'
import type { User } from './models/users'
import type { Blog } from './models/blogs'

export const initDB = async () => {
  await models.Blog.truncate({ cascade: true, restartIdentity: true })
  await models.User.truncate({ cascade: true, restartIdentity: true })
  let users: User[] = await models.User.bulkCreate([
    { username: 'mars77', name: 'vlad', passwordHash: await bcrypt.hash('12345', 10) },
    { username: 'foo', name: 'bar', passwordHash: await bcrypt.hash('12345', 10) },
  ])
  users = users.map((x) => x.toJSON())
  await models.Blog.bulkCreate([
    {
      title: 'Bogus Title 1',
      author: 'Fake Author 1',
      url: 'http://bogusurl1.com',
      likes: 0,
      year: 2008,
      user: users[0]?.name,
      userId: users[0]?.id,
    },
    {
      title: 'Bogus Title 2',
      author: 'Fake Author 2',
      url: 'http://bogusurl2.com',
      likes: 4,
      year: 2007,
      user: users[0]?.name,
      userId: users[0]?.id,
    },
    {
      title: 'Bogus Title 3',
      author: 'Fake Author 3',
      url: 'http://bogusurl3.com',
      likes: 563,
      year: 1994,
      user: users[1]?.name,
      userId: users[1]?.id,
    },
  ])
}
