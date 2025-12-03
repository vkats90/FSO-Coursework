import models from '../models'
import supertest from 'supertest'
import app from '../app'
import { sequelize } from '../dbConnection'

const api = supertest(app)
let token = ''

beforeAll(async () => {
  await models.User.truncate({ cascade: true, restartIdentity: true })
  await models.activeSessions.truncate({ cascade: true, restartIdentity: true })
  await models.Blog.truncate({ cascade: true, restartIdentity: true })

  await api.post('/api/users').send({
    username: 'placeholder@gmail.com',
    name: 'bot',
    password: 'password1',
    disabled: false,
  })
})

describe('testing active sessions', () => {
  test('login in creates a session', async () => {
    const login = await api
      .post('/api/login')
      .send({ username: 'placeholder@gmail.com', password: 'password1' })

    token = login.body.token
    const res = await models.activeSessions.findAll({})

    expect(res).toBeDefined()
    expect(res[0]?.toJSON().token).toEqual(token)
    expect(res[0]?.toJSON().userId).toEqual(1)
  })

  test('adding a blog is succeful when active session present', async () => {
    let blog = {
      title: 'Bogus Title 4',
      author: 'Fake Author 4',
      url: 'http://bogusurl4.com',
    }
    const response = await api.post('/api/blogs').set('Authorization', token).send(blog).expect(201)
    expect(response.body.title).toBe(blog.title)
    expect(response.body.url).toBe(blog.url)
  })

  test('adding a blog is unsucceful when the token on hand is different from the one in the server', async () => {
    await models.activeSessions.update({ token: 'sfaf' }, { where: { userId: 1 } })

    let blog = {
      title: 'Bogus Title 1',
      author: 'Fake Author 1',
      url: 'http://bogusurl1.com',
    }
    const response = await api.post('/api/blogs').set('Authorization', token).send(blog).expect(401)

    expect(response.body).toBeDefined()
    expect(response.body.error).toBe('Unauthorized')
  })
})

afterAll(async () => {
  await sequelize.close()
})
