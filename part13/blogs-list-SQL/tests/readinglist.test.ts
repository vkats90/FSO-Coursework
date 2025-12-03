import models from '../models'
import supertest from 'supertest'
import app from '../app'
import { sequelize } from '../dbConnection'

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

describe('test reading list endpoints', () => {
  test('Adding a reading list entry is succeful', async () => {
    const res = await api
      .post('/api/readinglists')
      .set('Authorization', token)
      .send({
        blogId: 1,
        userId: 1,
        read: false,
      })
      .expect(200)

    expect(res.body).toBeDefined()
    expect(res.body.userId).toEqual(1)
    expect(res.body.blogId).toEqual(1)
    expect(res.body.read).toEqual(false)
  })

  test('looking at a user displays his readinglist', async () => {
    const res = await api.get('/api/users/1')

    expect(res.body).toBeDefined()
    expect(res.body.readings.length).toEqual(1)
    expect(res.body.readings[0].title).toEqual('Bogus Title 1')
  })

  test('lookking at a blog displays ', async () => {
    const res = await api.get('/api/users/1')

    expect(res.body).toBeDefined()
    expect(res.body.readings.length).toEqual(1)
    expect(res.body.readings[0].title).toEqual('Bogus Title 1')
    expect(res.body.readings[0].reading_list.read).toEqual(false)
  })
})

describe('testing updating areading list', () => {
  test('Updating a blog to Read in the readinglist works as expected', async () => {
    await api
      .put('/api/readinglists/1')
      .set('Authorization', token)
      .send({
        read: true,
      })
      .expect(204)

    const reading_list = await models.ReadingLists.findByPk(1)

    expect(reading_list).toBeDefined()
    expect(reading_list?.toJSON().read).toEqual(true)
  })

  test('looking at a user displays his updated readinglist', async () => {
    const res = await api.get('/api/users/1')

    expect(res.body).toBeDefined()
    expect(res.body.readings.length).toEqual(1)
    expect(res.body.readings[0].title).toEqual('Bogus Title 1')
  })

  test('lookking at a blog displays ', async () => {
    const res = await api.get('/api/users/1')

    expect(res.body).toBeDefined()
    expect(res.body.readings.length).toEqual(1)
    expect(res.body.readings[0].title).toEqual('Bogus Title 1')
    expect(res.body.readings[0].reading_list.read).toEqual(true)
  })
})

afterAll(async () => {
  await sequelize.close()
})
