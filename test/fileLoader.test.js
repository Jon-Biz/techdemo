import test from 'tape'

import {load, parse} from '../fileLoader'

test('File loader: methods', (t) => {

  t.test('# load', (t) => {
    load((data) => {
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
    ,' the returned array should match the test data'
    )

    testdata = `1,2
3,4`
    parsedData = parse(testdata)

    t.deepEqual(
      parsedData
    , [[1,2], [3,4]]
    ,' the returned array should match the test data'
    )

    t.end()
  })
  t.end()
})
