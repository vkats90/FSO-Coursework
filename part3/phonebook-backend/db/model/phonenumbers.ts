import mongoose from 'mongoose'

const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: function (v: string) {
        return /^\d{2,3}-\d+$/.test(v)
      },
      message: ({ value }: { value: string }) => `${value} is not a valid phone number!`,
    },
    required: true,
  },
})

phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export const PhoneNumber = mongoose.model('phoneNumber', phoneSchema)
