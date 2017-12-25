import mongoose, { Schema, mongo } from 'mongoose'
import validate from 'mongoose-validator'

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
  channels: [
    {
      type: Schema.Types.ObjectId,
      default: [],
      ref: 'Channel',
    },
  ],
})

Team.statics.addChannel = function(id, channel) {
  return this.findByIdAndUpdate(id, { $push: { channels: channel } })
}

Team.statics.addMember = function(id, member) {
  return this.findByIdAndUpdate(id, { $push: { members: member } })
}

export default mongoose.model('Team', Team)
