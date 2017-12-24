import mongoose, { Schema, mongo } from 'mongoose'

const Team = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    validate: [
      validate({
        validator: 'isAlphanumeric',
        message: 'Team name must only consist of letters and numbers.',
      }),
    ],
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      default: [],
      ref: 'User',
    },
  ],
})

export default mongoose.model('User', User)
