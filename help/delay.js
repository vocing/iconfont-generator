const delay = (time = 100) => {
  let f = null
  return (fn) => {
    clearTimeout(f)
    f = setTimeout(() => {
      fn()
    }, time)
  }
}

module.exports = delay