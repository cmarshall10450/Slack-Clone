import formatErrors from '../../formatErrors'
import { requiresAuth } from '../../permissions'

export default {
  Mutation: {
    createTeam: requiresAuth.createResolver(
      async (parent, { name }, { models, user }) => {
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

          return {
            ok: true,
            team,
          }
        } catch (err) {
          return {
            ok: false,
            errors: formatErrors(err),
          }
        }
      }
    ),
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
