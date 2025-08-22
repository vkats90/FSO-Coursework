import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    unique: true,
    minLength: 3,
    required: true,
  },
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export const User = mongoose.model('User', userSchema)
