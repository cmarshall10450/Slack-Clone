import { model } from 'mongoose'

export default {
  Query: {
    users: (parent, args, { models }) => models.User.find({}),
    getUserById: (parent, { id }, { models }) => models.User.findById(id),
    getUserByUsername: (parent, { username }, { models }) =>
      models.User.findOne({ username }),
  },
  Mutation: {
    createUser: async (parent, args, { models }) =>
      await new models.User(args).save(),
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
