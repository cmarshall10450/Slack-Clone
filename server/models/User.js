import mongoose, { Schema } from 'mongoose'
import validate from 'mongoose-validator'

const User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: [
      validate({
        validator: 'isLength',
        arguments: [3, 25],
        message:
          'Username must be between {ARGS[0]} and {ARGS[1]} characters long.',
      }),
      validate({
        validator: 'isAlphanumeric',
        message: 'Username must only consist of letters and numbers.',
      }),
    ],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [
      validate({
        validator: 'isLength',
        arguments: [3, 25],
        message:
          'Email should be between {ARGS[0]} and {ARGS[1]} characters long.',
      }),
      validate({
        validator: 'isEmail',
        message: 'Email needs to contain an @ symbol and a domain e.g. .com .',
      }),
    ],
  },
  password: {
    type: String,
    required: true,
  },
})

export default mongoose.model('User', User)
