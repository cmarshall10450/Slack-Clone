import mongoose, { Schema } from 'mongoose'
import validate from 'mongoose-validator'
import bcrypt from 'bcrypt'

const User = new Schema({
  username: {
    type: String,
    required: true,
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

User.pre('save', function(next) {
  var user = this

  if (!user.isModified('password')) return next()

  bcrypt.hash(user.password, 12).then(function(hash) {
    user.password = hash
    next()
  })
})

User.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(this.password, hash).then(res => {
    if (res) {
      cb()
    }
  })
}

export default mongoose.model('User', User)
