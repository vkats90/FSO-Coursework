import mongoose from 'mongoose'

export type BlogType = {
  id: string
  title: string
  author: string
  url: string
  likes: number
  __v: number
}

export type UserType = {
  id: string
  name: string
  username: string
  passwordHash: string
  blogs?: [mongoose.Types.ObjectId]
}
