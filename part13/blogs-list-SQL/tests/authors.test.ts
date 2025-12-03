import models from '../models'
import supertest from 'supertest'
import app from '../app'
import { sequelize } from '../dbConnection'

const api = supertest(app)

beforeAll(async () => {
  await models.Blog.truncate({ cascade: true, restartIdentity: true })

  await models.Blog.bulkCreate([
    {
      title: 'Understanding JavaScript',
      author: 'Alice Johnson',
      url: 'http://js-tutorial.com',
      likes: 10,
      userId: 1,
    },
    {
      title: 'Mastering Python',
      author: 'Bob Smith',
      url: 'http://python-guide.com',
      likes: 5,
      userId: 1,
    },
    {
      title: 'Advanced React Patterns',
      author: 'Alice Johnson',
      url: 'http://react-patterns.com',
      likes: 15,
      userId: 1,
    },
    {
      title: 'Intro to Databases',
      author: 'Charlie Brown',
      url: 'http://db-intro.com',
      likes: 8,
      userId: 1,
    },
    {
      title: 'CSS for Beginners',
      author: 'Bob Smith',
      url: 'http://css-basics.com',
      likes: 3,
      userId: 1,
    },
    {
      title: 'Node.js in Depth',
      author: 'Alice Johnson',
      url: 'http://nodejs-depth.com',
      likes: 20,
      userId: 1,
    },
    {
      title: 'Understanding TypeScript',
      author: 'Diana Prince',
      url: 'http://typescript-guide.com',
      likes: 7,
      userId: 1,
    },
    {
      title: 'GraphQL Essentials',
      author: 'Charlie Brown',
      url: 'http://graphql-essentials.com',
      likes: 12,
      userId: 1,
    },
    {
      title: 'Building REST APIs',
      author: 'Alice Johnson',
      url: 'http://rest-api.com',
      likes: 25,
      userId: 1,
    },
    {
      title: 'DevOps Basics',
      author: 'Diana Prince',
      url: 'http://devops-basics.com',
      likes: 4,
      userId: 1,
    },
  ])
})

describe('testing the authors functionality', () => {
  test("making a request displays 4 lines each with it's own author", async () => {
    const res = await api.get('/api/authors').expect(200)

    expect(res.body.length).toBe(4)
    expect(Object.keys(res.body[0]).length).toBe(3)
    expect(res.body.find((a: any) => a.author == 'Diana Prince')).toBeDefined()
  })

  test('making a request displays each author with the correct ammount of articles and likes', async () => {
    const res = await api.get('/api/authors').expect(200)
    const alice = res.body.find((a: any) => a.author === 'Alice Johnson')

    expect(alice).toBeDefined()
    expect(alice.articles).toBe('4')
    expect(alice.likes).toBe('70')
  })

  test('making a request displays 4 lines ordered by the number of likes', async () => {
    const res = await api.get('/api/authors').expect(200)

    expect(res.body.length).toBe(4)
    expect(Number(res.body[0].likes)).toBeGreaterThan(Number(res.body[1].likes))
    expect(Number(res.body[1].likes)).toBeGreaterThan(Number(res.body[2].likes))
    expect(Number(res.body[2].likes)).toBeGreaterThan(Number(res.body[3].likes))
  })
})

afterAll(async () => {
  await sequelize.close()
})
