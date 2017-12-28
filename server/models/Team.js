import mongoose, { Schema, mongo } from 'mongoose'
import validate from 'mongoose-validator'

const Team = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
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
