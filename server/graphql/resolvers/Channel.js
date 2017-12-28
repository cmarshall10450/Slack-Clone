import formatErrors from '../../formatErrors'
import { requiresAuth } from '../../permissions'

export default {
  Channel: {
    messages: ({ id }, args, { models }) =>
      models.Channel.findById(id)
        .populate('messages')
        .then(channel => channel.messages),
  },
  Mutation: {
    createChannel: requiresAuth.createResolver(
      async (parent, { teamId, name }, { models, user }) => {
        try {
          const team = await models.Team.findById(teamId)

          if (user.id != team.id) {
            return {
              ok: false,
              errors: [
                {
                  path: 'name',
                  message:
                    'You must be the owner of the team to create channels',
                },
              ],
            }
          }

          const channel = await new models.Channel({
            name,
            team: teamId,
          }).save()
          await models.Team.findByIdAndUpdate(teamId, {
            $push: { channels: channel },
          })

          return {
            ok: true,
            channel,
          }
        } catch (err) {
          console.log(err)
          return {
            ok: false,
            errors: formatErrors(err),
          }
        }
      }
    ),
  },
}
