import mongoose, { Schema } from 'mongoose'

const Message = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    channel: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Channel',
    },
  },
  { timestamps: true }
)

export default mongoose.model('Message', Message)
