import { PubSub, withFilter } from 'graphql-subscriptions'

import { requiresAuth } from '../../permissions'

const pubsub = new PubSub()

const NEW_CHANNEL_MESSAGE = 'NEW_CHANNEL_MESSAGE'

export default {
  Subscription: {
    newChannelMessage: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_CHANNEL_MESSAGE),
        (payload, args) => payload.channelId === args.channelId
      ),
    },
  },
  Message: {
    user: async (parent, args, { models }) =>
      await models.Message.findById(parent.id)
        .populate('user')
        .then(message => message.user),
  },
  Query: {
    messages: requiresAuth.createResolver(
      async (parent, { channelId }, { models }) =>
        models.Message.find({ channel: channelId }).sort({ createdAt: 1 })
    ),
  },
  Mutation: {
    createMessage: requiresAuth.createResolver(
      async (parent, { channelId, text }, { models, user }) => {
        try {
          const message = await new models.Message({
            channel: channelId,
            text,
            user: user.id,
          }).save()

          const asyncFunc = async () => {
            const currentUser = await models.User.findById(user.id)

            pubsub.publish(NEW_CHANNEL_MESSAGE, {
              channelId: channelId,
              newChannelMessage: {
                ...message.toObject(),
              },
            })
          }

          asyncFunc()

          return true
        } catch (err) {
          console.log(err)
          return false
        }
      }
    ),
  },
}
