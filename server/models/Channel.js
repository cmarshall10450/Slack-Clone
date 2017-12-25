import mongoose, { Schema, mongo } from 'mongoose'
import validate from 'mongoose-validator'

const Channel = new Schema({
  name: {
    type: String,
    required: true,
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  },
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
  public: {
    type: Boolean,
    default: false,
  },
})

export default mongoose.model('Channel', Channel)
