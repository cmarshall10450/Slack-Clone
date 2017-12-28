import formatErrors from '../../formatErrors'
import { requiresAuth } from '../../permissions'
import mongoose from 'mongoose'

export default {
  Team: {
    owner: (parent, args, { models }) =>
      models.Team.findById(parent.id)
        .populate('owner')
        .then(team => team.owner),
    channels: (parent, args, { models }) =>
      models.Team.findById(parent.id)
        .populate('channels')
        .then(team => team.channels),
    members: (parent, args, { models }) =>
      models.Team.findById(parent.id)
        .populate('members')
        .then(team => team.members),
  },
  Query: {
    teams: requiresAuth.createResolver((parent, args, { models, user }) =>
      models.Team.find({ $or: [{ owner: user.id }, { members: user.id }] })
    ),
  },
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

          const currentUser = await models.User.findById(user.id)

          await models.Team.findByIdAndUpdate(team.id, {
            $pushAll: { channels: [general, random], members: [currentUser] },
          })

          return {
            ok: true,
            team,
          }
        } catch (err) {
          if (err.hasOwnProperty('code') && err.code === 11000) {
            console.log('Error:', err)
            return {
              ok: false,
              errors: [
                { path: 'name', message: 'This team name is already in use' },
              ],
            }
          } else {
            return {
              ok: false,
              errors: formatErrors(err),
            }
          }
        }
      }
    ),
    addTeamMember: requiresAuth.createResolver(
      async (parent, { email, teamId }, { models, user }) => {
        try {
          const teamPromise = models.Team.findById(teamId)
          const userToAddPromise = models.User.findOne({ email })

          const [team, userToAdd] = await Promise.all([
            teamPromise,
            userToAddPromise,
          ])

          if (user.id != team.owner) {
            return {
              ok: false,
              errors: [
                {
                  path: 'email',
                  message:
                    'You cannot add users to this team. Please ask the team owner to add users.',
                },
              ],
            }
          }

          if (!userToAdd) {
            return {
              ok: false,
              errors: [
                {
                  path: 'email',
                  message: 'A user with this email does not exist.',
                },
              ],
            }
          }

          await models.Team.findByIdAndUpdate(teamId, {
            $push: { members: userToAdd },
          })

          return {
            ok: true,
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
