import { test, describe, beforeEach, after } from 'node:test'
import mongoose from 'mongoose'
import assert from 'node:assert'
import supertest from 'supertest'
import { User } from '../models/users'
import app from '../app'
import { UserType } from '../types'
import bcrypt from 'bcrypt'

const saltRounds = 10
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('1234', saltRounds)
  const user = new User({
    name: 'Vova Kats',
    username: 'VovaKats',
    passwordHash,
  })
  await user.save()
})

describe('When at least one user exists', async () => {
  test('when making GET call these users display', async () => {
    const users = await api.get('/api/users').expect(200)

    assert.strictEqual(users.body.length, 1)
    assert.strictEqual(users.body[0].name, 'Vova Kats')
  })
  test('adding a new user woks succefully', async () => {
    const random = Math.floor(Math.random() * 1000)
    const user = await api
      .post('/api/users')
      .send({
        name: 'Vlad',
        username: 'mars77' + random,
        password: '1234',
      })
      .expect(200)
  })
  test('the user is actually added to the database', async () => {
    const random = Math.floor(Math.random() * 1000)
    await api
      .post('/api/users')
      .send({
        name: 'Vlad',
        username: 'mars77' + random,
        password: '1234',
      })
      .expect(200)

    const allUsers = await api.get('/api/users')
    const user = allUsers.body.filter((x: UserType) => x.username == 'mars77' + random)[0]
    assert.strictEqual(user.name, 'Vlad')
    assert.strictEqual(user.username, 'mars77' + random)
  })
  test('trying to add a user with an existing username fails', async () => {
    const res = await api
      .post('/api/users')
      .send({
        name: 'Vlad',
        username: 'VovaKats',
        password: '1234',
      })
      .expect(400)

    assert.strictEqual(res.body.error, 'a User with this name already exists')
  })
  test('trying to add a user with a short username fails', async () => {
    const res = await api
      .post('/api/users')
      .send({
        name: 'Vlad',
        username: 'Vo',
        password: '1234',
      })
      .expect(400)

    assert.strictEqual(res.body.error, 'Username is too short')
  })
  test('trying to add a user with a short password fails', async () => {
    const res = await api
      .post('/api/users')
      .send({
        name: 'Vlad',
        username: 'VovaKats658',
        password: 'df',
      })
      .expect(400)

    assert.strictEqual(res.body.error, 'Password is too short')
  })
})

after(async () => {
  await mongoose.connection.close()
})
