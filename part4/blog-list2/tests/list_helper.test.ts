import { test, describe } from 'node:test'
import assert from 'node:assert'
import listHelper from '../utils/list_helper'
import { BlogType } from '../types'

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0,
  },
]

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

/*test('Test the dummy function', () => {
  const blogs: BlogType[] = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('Total Likes', () => {
  test('When getting a list with one blog return the likes of that', () => {
    const likes: number = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(likes, 5)
  })

  test('When getting blog list it returns the sum of likes', () => {
    const likes: number = listHelper.totalLikes(blogs)
    assert.strictEqual(likes, 36)
  })
})

describe('Most Likes', () => {
  test('When getting a list with one blog return that blog', () => {
    const blog = listHelper.mostLiked(listWithOneBlog)

    assert.deepStrictEqual(blog, listWithOneBlog[0])
  })

  test('When getting a list with many blogs return the blog with most likes', () => {
    const blog = listHelper.mostLiked(blogs)

    assert.deepStrictEqual(blog, blogs[2])
  })
})

describe('Most Prolific Writer', () => {
  test('When getting a list with one blog return that author with one book', () => {
    const blog = listHelper.mostProlificWriter(listWithOneBlog)

    assert.deepStrictEqual(blog, { author: 'Edsger W. Dijkstra', blogs: 1 })
  })

  test('When getting a list with many blogs return the author with most blogs', () => {
    const blog = listHelper.mostProlificWriter(blogs)

    assert.deepStrictEqual(blog, { author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('Most Liked Writer', () => {
  test('When getting a list with one blog return that author with his likes', () => {
    const blog = listHelper.mostLikedAuthor(listWithOneBlog)

    assert.deepStrictEqual(blog, { author: 'Edsger W. Dijkstra', likes: 5 })
  })

  test('When getting a list with many blogs return the author with most likes', () => {
    const blog = listHelper.mostLikedAuthor(blogs)

    assert.deepStrictEqual(blog, { author: 'Edsger W. Dijkstra', likes: 17 })
  })
})*/
