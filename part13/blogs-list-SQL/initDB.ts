import models from './models'
import bcrypt from 'bcrypt'
import type { User } from './models/users'
import type { Blog } from './models/blogs'

export const initDB = async () => {
  await models.Blog.truncate({ cascade: true, restartIdentity: true })
  await models.User.truncate({ cascade: true, restartIdentity: true })
  await models.ReadingLists.truncate({ cascade: true, restartIdentity: true })
  let users: User[] = await models.User.bulkCreate([
    { username: 'mars77', name: 'vlad', passwordHash: await bcrypt.hash('12345', 10) },
    { username: 'foo', name: 'bar', passwordHash: await bcrypt.hash('12345', 10) },
  ])
  users = users.map((x) => x.toJSON())
  let blogs = await models.Blog.bulkCreate([
    {
      title: 'Bogus Title 1',
      author: 'Fake Author 1',
      url: 'http://bogusurl1.com',
      likes: 0,
      year: 2008,
      userId: users[0]?.id,
    },
    {
      title: 'Bogus Title 2',
      author: 'Fake Author 2',
      url: 'http://bogusurl2.com',
      likes: 4,
      year: 2007,
      userId: users[0]?.id,
    },
    {
      title: 'Bogus Title 3',
      author: 'Fake Author 3',
      url: 'http://bogusurl3.com',
      likes: 563,
      year: 1994,
      userId: users[1]?.id,
    },
  ])

  blogs = blogs.map((x) => x.toJSON())

  await models.ReadingLists.bulkCreate([
    {
      userId: users[0]?.id,
      blogId: blogs[0]?.id,
      read: false,
    },
    {
      userId: users[1]?.id,
      blogId: blogs[0]?.id,
      read: false,
    },
    {
      userId: users[1]?.id,
      blogId: blogs[0]?.id,
      read: false,
    },
    {
      userId: users[0]?.id,
      blogId: blogs[2]?.id,
      read: false,
    },
    {
      userId: users[1]?.id,
      blogId: blogs[2]?.id,
      read: false,
    },
  ])
}
