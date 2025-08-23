import { test, describe, beforeEach, after, before } from 'node:test'
import mongoose from 'mongoose'
import assert from 'node:assert'
import supertest from 'supertest'
import { Blog } from '../models/blogs'
import { User } from '../models/users'
import app from '../app'
import { BlogType, UserType } from '../types'
import bcrypt from 'bcrypt'

const api = supertest(app)
let userID: UserType | null

const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
]

before(async () => {
  await User.deleteMany({})
  const saltRounds = 10
  const passwordHash = await bcrypt.hash('1234', saltRounds)
  const user = new User({
    name: 'Vova Kats',
    username: 'VovaKats',
    passwordHash,
  })
  await user.save()
  const allUsers = await User.find({})
  if (allUsers) userID = allUsers[0].id
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(blogs.map((b) => ({ ...b, user: userID })))
})

describe('Test GET /api/blogs', () => {
  test('Get returns 6 blogs', async () => {
    const blogs = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(blogs.body.length, 6)
  })
  test('The returned blogs have a user populated', async () => {
    const blogs = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(blogs.body[0].user.name, 'Vova Kats')
  })

  test('Each blogs has a unique identifier id and not _id', async () => {
    const blogs = await api.get('/api/blogs')
    blogs.body.map((b: BlogType) => assert(b.id != undefined && (b as any)._id == undefined))
  })
})

describe('Test POST /api/blogs', () => {
  const newBlog = {
    title: 'A new Blog',
    author: 'Vlad Kats',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
  }

  test('sending POST adds the new post to the database', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogs = await api.get('/api/blogs')
    assert.strictEqual(blogs.body.length, 7)
    assert(blogs.body.find((b: BlogType) => b.title == 'A new Blog').length != 0)
  })

  test('adding a blog without likes sets it to 0 by default', async () => {
    const blog = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(blog.body.likes, 0)
  })

  test('adding a blog without a title returns an error', async () => {
    const blog = await api
      .post('/api/blogs')
      .send({ ...newBlog, title: undefined })
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(blog.body.error, 'Missing required fields title or url')
  })
})

describe('Test deleting blog functionality', async () => {
  test('deleting a blog is successful and returns the correct code', async () => {
    const allBlogs = await api.get('/api/blogs').expect(200)
    const blog: BlogType = allBlogs.body[0]
    await api.delete(`/api/blogs/${blog.id}`).expect(204)
  })
  test('deleting one blog actually decreses the quantity of blogs by one', async () => {
    const allBlogs = await api.get('/api/blogs').expect(200)
    const blog: BlogType = allBlogs.body[0]
    await api.delete(`/api/blogs/${blog.id}`).expect(204)

    const afterDelete = await api.get('/api/blogs').expect(200)
    assert.strictEqual(allBlogs.body.length - 1, afterDelete.body.length)
  })
  test('the deleted blog is actually missing from the blog list', async () => {
    const allBlogs = await api.get('/api/blogs').expect(200)
    const blog: BlogType = allBlogs.body[0]
    await api.delete(`/api/blogs/${blog.id}`).expect(204)

    const afterDelete = await api.get('/api/blogs').expect(200)
    assert.notStrictEqual(allBlogs.body[0].title, afterDelete.body[0].title)
  })
  test('trying to delete a blog with a non existing id returns code 400', async () => {
    const res = await api.delete(`/api/blogs/6445e1150b5c1e38e25a7d3f`).expect(400)

    assert.strictEqual(res.body.error, "A blog with this ID doesn't exist")
  })
})

describe('Testing PUT functionality', async () => {
  test('attempting to update a blog is succesfull', async () => {
    const allBlogs = await api.get('/api/blogs').expect(200)
    const blog = allBlogs.body[0]
    await api
      .put(`/api/blogs/${blog.id}`)
      .send({ ...blog, likes: 1056 })
      .expect(200)
  })
  test('updating a blog acctually changes it', async () => {
    const allBlogs = await api.get('/api/blogs').expect(200)
    const blog = allBlogs.body[0]

    const res = await api.put(`/api/blogs/${blog.id}`).send({ likes: 1056 }).expect(200)
    const afterUpdate = await api.get('/api/blogs').expect(200)

    assert.strictEqual(res.body.likes, 1056)
    assert.strictEqual(afterUpdate.body[0].likes, 1056)
  })
  test("attempting to update a blog that doesn't exist is unsuccessful", async () => {
    const allBlogs = await api.get('/api/blogs').expect(200)
    const blog = allBlogs.body[0]

    const res = await api
      .put(`/api/blogs/644da217d980a751150b50c0`)
      .send({ ...blog, likes: 1056 })
      .expect(400)

    assert.strictEqual(res.body.error, "A blog with this ID doesn't exist")
  })
})

after(async () => {
  await mongoose.connection.close()
})
