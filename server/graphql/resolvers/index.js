import path, { resolve } from 'path'
import { mergeResolvers, fileLoader } from 'merge-graphql-schemas'

const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, '.'), { recursive: true })
)

export default resolvers
