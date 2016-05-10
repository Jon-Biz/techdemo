import fs from 'fs'

const filename = 'datafile'

export function load(cb) {
  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err
    cb(data)
  })
}

export function parse(data) {
  const result = data.split('\n')
  const parsedResult = result.reduce((result, str) => {
    const splitStr = str.split(',')
    const numbers = splitStr.map(numString => parseInt(numString, 10))
    result.push(numbers)
    return result
  }, [])

  return parsedResult
}

export function getData(cb) {
  load((data) => {
    const result = parse(data)
    cb(result)
  })
}