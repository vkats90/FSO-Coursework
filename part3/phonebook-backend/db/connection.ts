import mongoose from 'mongoose'
require('dotenv').config()

const URL = process.env.MONGODB_URL

mongoose.set('strictQuery', false)

export const connect = async () => {
  try {
    URL && (await mongoose.connect(URL))
    console.log('Connected to MongoDB')
  } catch {
    console.log('Failed connecting to MongoDB')
  }
}
