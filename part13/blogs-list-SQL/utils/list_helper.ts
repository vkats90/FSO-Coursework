import { Blog } from '../types'

const dummy = (_blogs: Blog[]) => {
  return 1
}

const totalLikes = (blogs: Blog[]) => {
  return blogs.reduce((total, b) => total + b.likes, 0)
}

const mostLiked = (blogs: Blog[]) => {
  return blogs.find(({ likes }) => likes === Math.max(...blogs.map((b) => b.likes)))
}

const mostProlificWriter = (blogs: Blog[]) => {
  type Writers = Record<string, number>

  let writers: Writers = {}

  blogs.map((b) => {
    if (writers[b.author]) writers[b.author]++
    else writers[b.author] = 1
  })

  const books = Math.max(...Object.values(writers))

  return {
    author: Object.keys(writers).find((key) => writers[key] === books),
    blogs: books,
  }
}

const mostLikedAuthor = (blogs: Blog[]) => {
  type Writers = Record<string, number>

  let writers: Writers = {}

  blogs.map((b) => {
    if (writers[b.author] != undefined) writers[b.author] += b.likes
    else writers[b.author] = b.likes
  })

  console.log(writers)
  const likes = Math.max(...Object.values(writers))

  return {
    author: Object.keys(writers).find((key) => writers[key] === likes),
    likes: likes,
  }
}

export default { dummy, totalLikes, mostLiked, mostProlificWriter, mostLikedAuthor }
