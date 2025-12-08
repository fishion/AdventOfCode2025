import PuzzleBase, { type answerObject } from "../lib/puzzle-base.ts"

class Puzzle extends PuzzleBase {
  testAns: answerObject = { pt1: 13, pt2: 43 }
  rowCount: number = 0
  colCount: number = 0
  adjacencyMap: number[][] = []
  rollLocations: Record<string, true> = {}

  constructor(day?: number) {
    super(day)

    // build the adjacencyMap skeleton, filled with zeros
    this.rowCount = this.input.length
    this.colCount = this.input[0].split("").length
    for (let i = 0; i < this.rowCount; i++) {
      this.adjacencyMap.push(new Array(this.colCount).fill(0))
    }

    // now read the input and populate rollLocations lookup and adjacencyMap
    this.input.forEach((row, rowIndex) => {
      row.split("").forEach((symbol, colIndex) => {
        if (symbol == "@") {
          this.rollLocations[`${rowIndex}:${colIndex}`] = true // put location in object for lookup
          this.incrementAdjacent(rowIndex, colIndex, 1)
        }
      })
    })
  }

  incrementAdjacent(rowIndex: number, colIndex: number, by: 1 | -1) {
    if (rowIndex > 0) {
      if (colIndex > 0) this.adjacencyMap[rowIndex - 1][colIndex - 1] += by
      this.adjacencyMap[rowIndex - 1][colIndex] += by
      if (colIndex < this.colCount - 1) this.adjacencyMap[rowIndex - 1][colIndex + 1] += by
    }
    if (colIndex > 0) this.adjacencyMap[rowIndex][colIndex - 1] += by
    if (colIndex < this.colCount - 1) this.adjacencyMap[rowIndex][colIndex + 1] += by
    if (rowIndex < this.rowCount - 1) {
      if (colIndex > 0) this.adjacencyMap[rowIndex + 1][colIndex - 1] += by
      this.adjacencyMap[rowIndex + 1][colIndex] += by
      if (colIndex < this.colCount - 1) this.adjacencyMap[rowIndex + 1][colIndex + 1] += by
    }
  }

  rollReachable(rollCoords: string) {
    const [rowIndex, colIndex] = rollCoords.split(":").map(el => parseInt(el))
    return this.adjacencyMap[rowIndex][colIndex] < 4
  }

  pt1() {
    for (const rollCoords in this.rollLocations) {
      if (this.rollReachable(rollCoords)) this.ans.pt1 = <number>this.ans.pt1 + 1
    }
  }
  pt2() {
    const rollCountStart = Object.keys(this.rollLocations).length
    let removedThisIteration = 1 // start true
    while (removedThisIteration > 0) {
      removedThisIteration = 0
      for (const rollCoords in this.rollLocations) {
        if (this.rollReachable(rollCoords)) {
          delete this.rollLocations[rollCoords] // remove this role from locations object
          const [rowIndex, colIndex] = rollCoords.split(":").map(el => parseInt(el))
          this.incrementAdjacent(rowIndex, colIndex, -1) // no longer adjacent
          removedThisIteration++
        }
      }
      this.debugOut(`removed this iteration ${removedThisIteration}`)
    }
    this.ans.pt2 = rollCountStart - Object.keys(this.rollLocations).length
  }
}

const puzzle = new Puzzle()
puzzle.run()
