import bezier from 'bezier-easing'

const KF_TYPES = {
  HOLD: 0,
  LINEAR: 1,
  BEZIER: 2
}

const ERRORS = {
  badDataObj: () => 'Unable to read curves data object.'
}

function lerp (v0, v1, t) {
  return v0 * (1 - t) + v1 * t
}

function validateDataObj (data) {
  if (
    !data ||
    data.d === undefined ||
    data.w === undefined ||
    data.h === undefined ||
    data.k === undefined
  ) {
    throw new Error(ERRORS.badDataObj)
  }
}

function readValue (progress, current, next) {
  if (!next) return current[1] // last item, hold value

  const relProgress = Math.min(Math.max((progress - current[0]) / (next[0] - current[0]), 0), 1)
  if (current[2] === KF_TYPES.BEZIER) {
    return lerp(current[1], next[1],current[4](relProgress))
  } else if (current[2] === KF_TYPES.HOLD) {
    return current[1]
  } else if (current[2] === KF_TYPES.LINEAR) {
    return lerp(current[1], next[1], relProgress)
  } else {
    return 0
  }
}

function readCurve (progress, data, key, cache) {
  if (isNaN(progress)) progress = 0
  progress = Math.min(Math.max(progress, 0), 1)

  const cacheIndex = cache[key]
  const cached = data[cacheIndex]

  if (progress === cached[0]) {
    return readValue(progress, cached, data[cacheIndex + 1])
  }

  const direction = progress >= cached[0] ? 1 : -1
  let currentIndex = cacheIndex
  let current = cached
  const lastIndex = data.length - 1

  // bounds check
  if (progress <= data[0][0]) {
    cache[key] = 0
    return data[0][1]
  } else if (progress >= data[lastIndex][0]) {
    cache[key] = lastIndex
    return data[lastIndex][1]
  }

  // look for next value from cached one
  while (true) {
    let nextIndex = currentIndex + direction
    let next = data[nextIndex]
    if (direction === 1 && (next === undefined || next[0] > progress)) {
      cache[key] = currentIndex
      return readValue(progress, current, data[currentIndex + 1])
    } else if (direction === -1 && (next === undefined || next[0] <= progress)) {
      if (nextIndex < 0) {
        nextIndex = 0
        next = data[0]
      }
      cache[key] = nextIndex
      return readValue(progress, next, data[nextIndex + 1])
    }
    currentIndex = nextIndex
    current = next
  }
}

function generateEasings (props) {
  for (let prop in props) {
    const keyframes = props[prop]
    keyframes.map(point => {
      if (!point[3]) return point
      point[4] = bezier(point[3][0], point[3][1], point[3][2], point[3][3])
    })
  }
}

function readCurves (rawdata = {}, opts = {}) {
  // deep copy data
  const data = JSON.parse(JSON.stringify(rawdata))

  validateDataObj(data)

  const duration = data.d
  const width = data.w
  const height = data.h
  const props = data.k

  if (opts.props) {
    for (let prop in props) {
      if (!~opts.props.indexOf(prop)) delete props[prop]
    }
  }

  const val = {}
  const cache = {}
  for (let prop in props) cache[prop] = 0 // create cache

  generateEasings(props)
  seek(0)
  return { seek, val, values: val, v: val, duration, width, height }

  function seek (progress = 0) {
    for (let prop in props) val[prop] = readCurve(progress, props[prop], prop, cache)
  }
}

export default readCurves
