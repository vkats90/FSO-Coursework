import models from '../models'
import supertest from 'supertest'
import app from '../app'
import { sequelize } from '../dbConnection'
import type { Blog } from '../models/blogs'

const api = supertest(app)
let token: string = ''
let blogID: string = ''

beforeAll(async () => {
  await models.Blog.truncate({ cascade: true, restartIdentity: true })
  await models.User.truncate({ cascade: true, restartIdentity: true })
  await api
    .post('/api/users')
    .send({ username: 'placeholder@gmail.com', name: 'bot', password: 'password1' })
  const res = await api
    .post('/api/login')
    .send({ username: 'placeholder@gmail.com', password: 'password1' })
  token = 'Bearer ' + res.body.token
  await api.post('/api/blogs').set('Authorization', token).send({
    title: 'Bogus Title 1',
    author: 'Fake Author 1',
    url: 'http://bogusurl1.com',
  })

  await api.post('/api/blogs').set('Authorization', token).send({
    title: 'Bogus Title 2',
    author: 'Fake Author 2',
    url: 'http://bogusurl2.com',
    likes: 2,
  })

  await api.post('/api/blogs').set('Authorization', token).send({
    title: 'Bogus Title 3',
    author: 'Fake Author 3',
    url: 'http://bogusurl3.com',
    likes: 5,
  })
})

describe('testing the GET functionality', () => {
  test('making a request displays the 3 blogs and they are orderes', async () => {
    const res = await api.get('/api/blogs')

    expect(res.body.length).toBe(3)
    expect(res.body[0].title).toBe('Bogus Title 3')
    expect(res.body[0].likes).toBe(5)
    expect(res.body[1].title).toBe('Bogus Title 2')
  })

  test('making a GET request displays the user that owns the blogs', async () => {
    const res = await api.get('/api/blogs')

    expect(res.body[0].user.username).toBe('placeholder@gmail.com')
    const usernames = res.body
      .map((a: any) => a.user.username)
      .filter((a: any) => a == 'placeholder@gmail.com')
    expect(usernames.length).toBe(3)
  })

  test('making a request with a search query displays only the blogs with the search item in the title field', async () => {
    const res = await api.get('/api/blogs?search=Bogus Title 3')

    expect(res.body.length).toBe(1)
    expect(res.body[0].title).toBe('Bogus Title 3')
    expect(res.body[0].likes).toBe(5)
  })

  test('making a request with a search query displays only the blogs with the search item in the title or author fields', async () => {
    const res = await api.get('/api/blogs?search=3')

    expect(res.body.length).toBe(1)
    expect(res.body[0].title).toBe('Bogus Title 3')
    expect(res.body[0].author).toBe('Fake Author 3')
    expect(res.body[0].likes).toBe(5)
  })
})

describe('testing the POST functionality', () => {
  test('make sure a blog can be created', async () => {
    let blog = {
      title: 'Bogus Title 4',
      author: 'Fake Author 4',
      url: 'http://bogusurl4.com',
    }
    const response = await api.post('/api/blogs').set('Authorization', token).send(blog).expect(201)
    expect(response.body.title).toBe(blog.title)
    expect(response.body.url).toBe(blog.url)

    const res = await api.get('/api/blogs')
    expect(res.body.length).toBe(4)
    const search = res.body.find((x: Blog) => x.title == 'Bogus Title 4')
    expect(search.title).toBe('Bogus Title 4')
  })

  test("make sure that you can't post a blog without a title or URL", async () => {
    let blog = {
      title: 'Bogus Title 4',
      author: 'Fake Author 4',
      url: 'http://bogusurl4.com',
    }
    const response = await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send({ ...blog, title: undefined })
    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Missing required fields title or url')

    const response1 = await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send({ ...blog, url: undefined })
    expect(response1.status).toBe(400)
    expect(response1.body.error).toBe('Missing required fields title or url')
  })

  test("make sure that you can't submit a post with a year earlier than 1992", async () => {
    let blog = {
      title: 'Bogus Title 4',
      author: 'Fake Author 4',
      url: 'http://bogusurl4.com',
      year: 1990,
    }
    const response = await api.post('/api/blogs').set('Authorization', token).send(blog)
    expect(response.status).toBe(400)
    expect(response.body.error).toBe('The year must be between 1992 and this year')

    const response1 = await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send({ ...blog, url: undefined })
    expect(response1.status).toBe(400)
    expect(response1.body.error).toBe('Missing required fields title or url')
  })

  test('make sure that you cannot submit a user without authorization token', async () => {
    let blog = {
      title: 'Bogus Title 4',
      author: 'Fake Author 4',
      url: 'http://bogusurl4.com',
    }
    const response = await api.post('/api/blogs').send(blog)
    expect(response.status).toBe(401)
    expect(response.body.error).toBe('Unauthorized')
  })
})

describe('testing the PUT functionality', () => {
  test('A blog can be modified', async () => {
    let blog = {
      likes: 56,
    }
    const response = await api
      .put(`/api/blogs/1`)
      .set('Authorization', token)
      .send(blog)
      .expect(200)
    expect(response.body.title).toBe('Bogus Title 1')
    expect(response.body.likes).toBe(56)

    const res = await api.get('/api/blogs')
    expect(res.body.length).toBe(4)
    expect(res.body.find((a: any) => a.id == 1).likes).toBe(56)
  })

  test('trying to update a blog whithout a token fails', async () => {
    let blog = {
      likes: 56,
    }
    const response = await api.put(`/api/blogs/1`).send(blog).expect(401)
    expect(response.body.error).toBe('Unauthorized')
  })

  test("trying to update a blog that doesn't exist doesn't work", async () => {
    let blog = {
      likes: 56,
    }
    const response = await api
      .put(`/api/blogs/65014`)
      .set('Authorization', token)
      .send(blog)
      .expect(400)
    expect(response.body.error).toBe("A blog with this ID doesn't exist")
  })

  test('trying to update a blog that is not yours fails', async () => {
    let blog = {
      likes: 56,
    }
    await api
      .post('/api/users')
      .send({ username: 'placeholder2@gmail.com', name: 'bot2', password: 'password12' })
    const res = await models.Blog.create({
      title: 'Not my Blog',
      author: 'someoneElse',
      url: 'www.someoneelsesblog.com',
      userId: '2',
    })
    blogID = res.toJSON().id
    const response = await api
      .put(`/api/blogs/${blogID}`)
      .set('Authorization', token)
      .send(blog)
      .expect(401)

    expect(response.body.error).toBe('Unauthorized')
  })
})

describe('testing the Delete functionality', () => {
  test('trying to delete a blog whithout a token fails', async () => {
    const response = await api.delete(`/api/blogs/4`).expect(401)
    expect(response.body.error).toBe('Unauthorized')
  })

  test("trying to delete a blog that doesn't exist doesn't work", async () => {
    const response = await api.delete(`/api/blogs/65014`).set('Authorization', token).expect(400)
    expect(response.body.error).toBe("A blog with this ID doesn't exist")
  })

  test('trying to delete a blog that is not yours, fails', async () => {
    const response = await api
      .delete(`/api/blogs/${blogID}`)
      .set('Authorization', token)
      .expect(401)
    expect(response.body.error).toBe('Unauthorized')
  })

  test('deleting a blog works', async () => {
    const res = await api.get('/api/blogs')
    const blog = res.body[0]
    await api.delete(`/api/blogs/${blog.id}`).set('Authorization', token).expect(204)
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(4)
    expect(response.body.filter((a: any) => a.title == blog.title).length).toBe(0)
  })
})

afterAll(async () => {
  await sequelize.close()
})
