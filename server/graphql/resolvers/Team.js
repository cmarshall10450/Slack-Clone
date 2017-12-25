export default {
  Mutation: {
    createTeam: async (parent, { name }, { models, user }) => {
      try {
        const team = await models.Team({ name, owner: user.id }).save()
        const general = await models
          .Channel({ name: 'general', team: team.id })
          .save()
        const random = await models
          .Channel({ name: 'random', team: team.id })
          .save()

        await models.Team.findByIdAndUpdate(team.id, {
          $pushAll: { channels: [general, random] },
        })

        return true
      } catch (err) {
        console.log(err)
        return false
      }
    },
    deleteTeam: async (parent, { id }, { models }) => {
      try {
        await models.Team.findByIdAndRemove(id)
        return true
      } catch (err) {
        console.log(err)
        return false
      }
    },
  },
}
