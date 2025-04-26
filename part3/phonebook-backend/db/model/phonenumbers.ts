import mongoose from 'mongoose'

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
})

phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export const PhoneNumber = mongoose.model('phoneNumber', phoneSchema)
