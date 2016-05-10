import {getData} from './fileLoader'
import Graph from './Graph'

const defaultFilename = 'datafile'

const args = process.argv.slice(2)

let filename, pointA, pointB
if(args.length == 0 || args.length == 2) {
  filename = defaultFilename
  pointA = args[0]
  pointB = args[1]
} else {
  filename = args[0]
  pointA = args[1]
  pointB = args[2]
}

getData(filename, (data) => {
  const graph = new Graph(data)
  graph.showRelationship(pointA, pointB)
  graph.showShortestPath(pointA, pointB)
})
