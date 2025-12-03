import models from '../models'
import supertest from 'supertest'
import app from '../app'
import { sequelize } from '../dbConnection'
import { error } from 'console'

const api = supertest(app)

beforeAll(async () => {
  await models.User.truncate({ cascade: true, restartIdentity: true })

  await api.post('/api/users').send({
    username: 'placeholder@gmail.com',
    name: 'bot',
    password: 'password1',
    disabled: false,
  })
})

describe('test loging in', () => {
  let token: string = ''
  let userID: string = ''

  test('loging in to an existing user is succeful', async () => {
    const res = await api
      .post('/api/login')
      .send({ username: 'placeholder@gmail.com', password: 'password1' })

    expect(res).toBeDefined()
    expect(res.body).toBeDefined()
    expect(res.body.token).toBeDefined()
    expect(res.body.id).toBeDefined()
  })

  test('trying to log in to a user that doesnt exist fails', async () => {
    const res = await api
      .post('/api/login')
      .send({ username: 'plac@gmail.com', password: 'password1' })

    expect(res.body.error).toBeDefined()
    expect(res.body.error).toEqual("User doesn't exist")
  })

  test('trying to log in without a password fails', async () => {
    const res = await api.post('/api/login').send({ username: 'placholder@gmail.com' })

    expect(res.body.error).toBeDefined()
    expect(res.body.error).toEqual('Missing username or password')
  })

  test('trying to log in  with a wrong password fails', async () => {
    const res = await api
      .post('/api/login')
      .send({ username: 'placeholder@gmail.com', password: 'dfafa' })

    expect(res.body.error).toBeDefined()
    expect(res.body.error).toEqual('Wrong Password')
  })

  test('loging in create an active session', async () => {
    const res = await api
      .post('/api/login')
      .send({ username: 'placeholder@gmail.com', password: 'password1' })

    token = res.body.token
    userID = res.body.id
    const session = await models.activeSessions.findOne({ where: { userId: userID } })

    expect(session).toBeDefined()
    expect(session?.toJSON().token).toEqual(token)
  })

  test('posting a post as a disabled user fails', async () => {
    await models.Blog.truncate({ cascade: true, restartIdentity: true })
    const res = await models.User.update(
      { name: 'bot3', disabled: true },
      { where: { username: 'placeholder@gmail.com' } }
    )
    console.log(res)

    const login = await api
      .post('/api/login')
      .set('Authorization', token)
      .send({ username: 'placeholder@gmail.com', password: 'password1' })

    token = login.body.token

    let blog = {
      title: 'Bogus Title 4',
      author: 'Fake Author 4',
      url: 'http://bogusurl4.com',
    }
    const response = await api.post('/api/blogs').set('Authorization', token).send(blog).expect(401)

    expect(response.body.error).toBeDefined()
    expect(response.body.error).toEqual('Unauthorized')
  })
})

afterAll(async () => {
  await sequelize.close()
})
