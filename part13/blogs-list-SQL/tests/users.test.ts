import models from '../models'
import supertest from 'supertest'
import app from '../app'
import { sequelize } from '../dbConnection'

const api = supertest(app)

beforeAll(async () => {
  await models.User.truncate({ cascade: true, restartIdentity: true })

  await api.post('/api/users').send({ username: 'placeholder', name: 'bot', password: 'password1' })
})

describe('testing the GET functionality', () => {
  test('making a request displays the single created user', async () => {
    const res = await api.get('/api/users')

    expect(res.body.length).toBe(1)
    expect(res.body[0].username).toBe('placeholder')
  })
})

describe('testing the POST functionality', () => {
  test('make sure a user can be created', async () => {
    let user = {
      username: 'testUser1',
      name: 'vlad',
      password: 'password',
    }
    const response = await api.post('/api/users').send(user).expect(201)
    expect(response.body.username).toBe(user.username)
    expect(response.body.password).not.toBe(user.password)
  })
  test("make sure that you can't submit a username that is not unique", async () => {
    let user = {
      username: 'placeholder',
      name: 'bot',
      password: 'password1',
    }
    const response = await api.post('/api/users').send(user)
    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Username must be unique')
  })
  test('make sure that you cannot submit a user with a missing password', async () => {
    let user = {
      username: 'testUser',
      name: 'bot',
    }
    const response = await api.post('/api/users').send(user)
    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Missing required fields username or password')
  })
})

describe('testing the PUT functionality', () => {
  let token: string = ''
  let userID: string = ''

  beforeAll(async () => {
    const res = await api
      .post('/api/login')
      .send({ username: 'placeholder', password: 'password1' })
    token = 'Bearer ' + res.body.token
    userID = res.body.id
  })

  test('A user can be modified', async () => {
    let user = {
      name: 'modifiedName',
    }
    const response = await api
      .put(`/api/users/${userID}`)
      .set('Authorization', token)
      .send(user)
      .expect(200)
    expect(response.body.username).toBe('placeholder')
    expect(response.body.name).toBe('modifiedName')
  })

  test('trying to update a user whithout a token fails', async () => {
    let user = {
      name: 'modifiedName',
    }
    const response = await api.put(`/api/users/${userID}`).send(user).expect(401)
    expect(response.body.error).toBe('Unauthorized')
  })

  test("trying to update a user that doesn't exist doesn't work", async () => {
    let user = {
      name: 'modifiedName',
    }
    const response = await api
      .put(`/api/users/65014`)
      .set('Authorization', token)
      .send(user)
      .expect(400)
    expect(response.body.error).toBe("A user with this ID doesn't exist")
  })
})

describe('testing the Delete functionality', () => {
  let token: string = ''
  let userID: string = ''

  beforeAll(async () => {
    const res = await api
      .post('/api/login')
      .send({ username: 'placeholder', password: 'password1' })
    token = 'Bearer ' + res.body.token
    userID = res.body.id
  })

  test('trying to delete a user whithout a token fails', async () => {
    const response = await api.delete(`/api/users/${userID}`).expect(401)
    expect(response.body.error).toBe('Unauthorized')
  })

  test("trying to delete a user that doesn't exist doesn't work", async () => {
    const response = await api.delete(`/api/users/65014`).set('Authorization', token).expect(400)
    expect(response.body.error).toBe("A user with this ID doesn't exist")
  })

  test('trying to delete a user that is not you, fails', async () => {
    const user = await api
      .post('/api/users')
      .send({ username: 'placeholder2', name: 'bot2', password: 'password12' })
    const response = await api
      .delete(`/api/users/${user.body.id}`)
      .set('Authorization', token)
      .expect(401)
    expect(response.body.error).toBe('Unauthorized')
  })

  test('deleting a user works', async () => {
    await api.delete(`/api/users/${userID}`).set('Authorization', token).expect(204)
    const response = await api.get('/api/users')
    expect(response.body.length).toBe(2)
    expect(response.body[0].name).not.toBe('bot')
  })
})

afterAll(async () => {
  await sequelize.close()
})
