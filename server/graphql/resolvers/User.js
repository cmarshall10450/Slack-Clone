import { model } from 'mongoose'
import formatErrors from '../../formatErrors'
import { tryLogin } from '../../auth'

export default {
  Query: {
    users: (parent, args, { models }) => models.User.find({}),
    getUserById: (parent, { id }, { models }) => models.User.findById(id),
    getUserByUsername: (parent, { username }, { models }) =>
      models.User.findOne({ username }),
  },
  Mutation: {
    register: async (parent, args, { models }) => {
      try {
        const user = await new models.User(args).save()
        return {
          ok: true,
          user,
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err),
        }
      }
    },
    login: (parent, { email, password }, { models, SECRET, SECRET2 }) =>
      tryLogin(email, password, models, SECRET, SECRET2),
    deleteUser: async (parent, { id }, { models }) => {
      try {
        await models.User.findByIdAndRemove(id)
        return true
      } catch (err) {
        console.log(err)
        return false
      }
    },
  },
}
