import decode from 'jwt-decode'

export default () => {
  try {
    const token = localStorage.getItem('token')
    const { user } = decode(token)

    return user
  } catch (error) {
    console.log(error)
    return null
  }
}
