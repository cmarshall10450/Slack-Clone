export default errors =>
  errors.reduce((acc, current) => {
    if (current.path in acc) {
      acc[current.path].push(current.message)
    } else {
      acc[current.path] = [current.message]
    }

    return acc
  }, {})
