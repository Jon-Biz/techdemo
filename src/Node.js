export class Node {
  constructor(id, route) {
    this.id = id
    this.neighbors = []
  }

  addNeighbor(neighborId) {
    this.neighbors.push(neighborId)
  }

  isNeighbor(neighborId) {
    return this.neighbors.some(nodeId => nodeId == neighborId)
  }
}

export default Node