import test from 'tape'

import Graph, {
  checkPath
, buildGraph
} from '../src/Graph'

test('Graph methods: buildGraph', (t) => {
  let testData, result

  testData = [[1,2],[3,4]]
  result = buildGraph(testData)

  t.equal(
    typeof result
  , 'object'
  , 'it should return an object')

  t.ok(
     result['1']
  && result['2']
  && result['3']
  && result['4']
  , 'it should return an object with a keys for each mentioned node'
  )

  t.deepEqual(
    result['1'].neighbors
  , [2]
  , 'instantiated node 1 should contain the correct neighbour data'
  )

  t.deepEqual(
    result['2'].neighbors
  , [1]
  , 'instantiated node 2 should contain the correct neighbour data'
  )

  t.deepEqual(
    result['3'].neighbors
  , [4]
  , 'instantiated node 3 should contain the correct neighbour data'
  )

  t.deepEqual(
    result['4'].neighbors
  , [3]
  , 'instantiated node 4 should contain the correct neighbour data'
  )

  t.end()
})


test('Graph methods: checkPath', (t) => {
  let graph, result

  graph = new Graph([['1','2']]).graph
  result = checkPath({graph, start:'1', end:'2'})

  t.deepEqual(
    result
  , ['1', '2']
  , `graph of a route through two items should return the two items`
    )

  graph = new Graph([['1','2'],['2','3']]).graph
  result = checkPath({graph, start:'1', end:'3'})

  t.deepEqual(
    result
  , ['1', '2', '3']
  , `graph of a route through three items should return the three items`
    )

  graph = new Graph([['1','2'],['3','4'],['2','3']]).graph
  result = checkPath({graph, start:'1', end:'3'})

  t.deepEqual(
    result
  , ['1', '2', '3']
  , `graph of a route through three items, and extra node-routes should return the three items`
    )

  graph = new Graph([['1','2'],['3','4'],['2','3'], ['1', '4']]).graph
  result = checkPath({graph, start:'1', end:'3'})

  t.deepEqual(
    result
  , ['1', '2', '3']
  , `graph of a route through three items, with another three node route, should not endlessly loop, should three items`
    )

  graph = new Graph([['1','2'],['3','4'],['2','3']]).graph
  result = checkPath({graph, start:'1', end:'4'})

  t.deepEqual(
    result
  , ['1', '2', '3', '4']
  , `graph of a route through four items should return ['1', '2', '3', '4']`
    )

  graph = new Graph([['1','3'],['1','2'],['2','3'],['3','4']]).graph
  result = checkPath({graph, start:'1', end:'4'})

  t.deepEqual(
    result
  , ['1', '3', '4']
  , `graph of a route through three items with a longer previous route should return ['1', '3', '4']`
    )

  t.end()

})