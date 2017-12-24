import mongoose, { Schema, mongo } from 'mongoose'

const Channel = new Schema({
  name: {
    type: String,
    required: true,
    validate: [
      validate({
        validator: 'isAlphanumeric',
        message: 'Channel name can only consist of letters and numbers.',
      }),
    ],
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      default: [],
      ref: 'User',
    },
  ],
  public: {
    type: Boolean,
    default: false,
  },
})

export default mongoose.model('Channel', Channel)
