export default {
  Message: {
    user: ({ id }, args, { models }) =>
      models.Message.findById(id)
        .populate('user')
        .then(message => messages.user),
  },
  Mutation: {
    createMessage: async (parent, { channelId, text }, { models, user }) => {
      try {
        const message = await new models.Message({
          text,
          channel: channelId,
          user: user.id,
        }).save()

        await models.Channel.findByIdAndUpdate(channelId, {
          $push: { messages: message },
        })

        return true
      } catch (err) {
        console.log(err)
        return false
      }
    },
  },
}
