import path from 'path'
import { mergeTypes, fileLoader } from 'merge-graphql-schemas'

const types = mergeTypes(
  fileLoader(path.join(__dirname, '.'), { recursive: true })
)

export default types
