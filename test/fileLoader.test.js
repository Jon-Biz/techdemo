import test from 'tape'

import {load, parse} from '../src/fileLoader'

test('File loader: methods', (t) => {

  t.test('# load', (t) => {
    load('datafile', (data) => {
      t.equal(
        typeof data
      , 'string'
      , `it should call its callback with a string`
        )

      t.end()
    })
  })

  t.test('# parse', (t) => {
    let testdata, parsedData

    testdata = ""
    parsedData = parse(testdata)

    t.ok(
      Array.isArray(parsedData)
    , `it should return an array`
    )

    testdata = `1,2`
    parsedData = parse(testdata)

    t.deepEqual(
      parsedData
    , [[1,2]]
    ,`when passed '1,2' should return [[1,2]]`
    )

    testdata = `1,2
3,4`
    parsedData = parse(testdata)

    t.deepEqual(
      parsedData
    , [[1,2], [3,4]]
    ,`when passed '1,2/newline3,4' should return [[1,2],[3,4]]`
    )

    t.end()
  })
  t.end()
})
