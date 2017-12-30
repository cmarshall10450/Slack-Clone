import pick from 'lodash/pick'

export default e => {
  if (e.hasOwnProperty('code') && e.code === 11000) {
    console.log(e)
    return [{ path: 'email', message: 'This email is already in use' }]
  }

  return Object.values(e.errors).map(error => pick(error, ['path', 'message']))
}
