import Node from './Node'

export function buildGraph(data) {
  let graph = data.reduce((result, route) => {
    route.forEach(point => {
      // if the node has not been instantiated, instantiate it
      if (!result[point]) result[point] = new Node(point)

      // add all the neighbors in the route to the node
      route.forEach(pointToAdd => {
        if (pointToAdd !== point) result[point].addNeighbor(pointToAdd)
      })
    })
    return result
  }, {})

  return graph
}

export function checkPath({graph, start, end, path = []}) {
  const nodeA = graph[start]
  if (nodeA) {
    if (nodeA.isNeighbor(end)) return [nodeA.id, end]
    else {
      const currentPath = path.concat([nodeA.id])
      const neighbourPath = nodeA.neighbors.reduce((result, nodeId) => {
        // if we've already visited this node, don't try again
        if(!path.includes(nodeId)) {
          const checkP = checkPath({graph, start: nodeId, end, path: currentPath})

          if(checkP) {
            if (!result) return checkP
            else if (result.length > checkP.length) return (checkP)
            else return result
          } else {
            return result
          }
        }
      }, false)

      if (neighbourPath) return [nodeA.id].concat(neighbourPath)
    }
  } else {
    return false
  }
}

export default class Graph {
  constructor(data) {
    this.graph = buildGraph(data)
  }

  areNeighbours(pointA, pointB){
    const NodeA = this.graph[pointA]

    if (NodeA && NodeA.isNeighbor(pointB)) return true
    else return false
  }

  showShortestPath() {
    for (const nodeId in this.graph) {
      const node = this.graph[nodeId]
      if (node) {
        for (const neighborNodeId in this.graph) {
          const neighborNode = this.graph[neighborNodeId]
          if (neighborNode) findShortestPath(node, neighborNode)
        }
      }
    }
  }

  showRelationships() {
    console.log('\n\n------- Showing All Relationships -----\n')

    for (const nodeId in this.graph) {
      const node = this.graph[nodeId]
      if (node) {
        for (const neighborId in this.graph) {
          if (node.id !== neighborId
          && node.isNeighbor(neighborId)) {
            console.log(`${node.id} is a neighbor of ${neighborId}`)
          }
        }
      }

      console.log('--------------------')
    }
  }

  showRelationship(pointA, pointB) {
    if(!Boolean(pointA)) this.showRelationships()
    else {
      const isNeighbor = this.areNeighbours(pointA,pointB)
      console.log(`${pointA} is ${(isNeighbor ? '': 'not ')}a neighbor of ${pointB}`)
    }
  }

  findShortestPath(nodeId, neighborId) {
    return checkPath({
      graph: this.graph
    , start:nodeId
    , end:neighborId
    })
  }

  displayPathInfo(nodeId, neighborId) {
    if (nodeId !== neighborId) {
      const shortestPath = this.findShortestPath(nodeId, neighborId)
      if (shortestPath) {
        console.log(`Shortest path between ${nodeId} and ${neighborId} is ${shortestPath.join(' -> ')}`)
      }
      else console.log(`No path between ${nodeId} and ${neighborId}`)
    }
    else console.log(`That's the same node!`)
  }

  showShortestPaths() {
    console.log('\n\n------------------Showing All Shortest Paths --------------\n')
    for (const nodeId in this.graph) {
      for (const neighborId in this.graph) {
        if (nodeId !== neighborId) this.displayPathInfo(nodeId, neighborId)
      }
    }
  }

  showShortestPath(pointA, pointB) {
    if(!Boolean(pointA)) this.showShortestPaths()
    else this.displayPathInfo(pointA, pointB)
  }
}
