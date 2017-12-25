export default {
  Mutation: {
    createChannel: async (parent, { teamId, name }, { models }) => {
      try {
        const channel = await new models.Channel({ name, team: teamId }).save()
        await models.Team.findByIdAndUpdate(teamId, {
          $push: { channels: channel },
        })

        return true
      } catch (err) {
        console.log(err)
        return false
      }
    },
  },
}
