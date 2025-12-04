import PuzzleBase, { type answerObject } from "../lib/puzzle-base.ts"

interface Block {
  isRoll: boolean
  rollsAdjacent: number
}

class Puzzle extends PuzzleBase {
  testAns: answerObject = { pt1: 13, pt2: 43 }
  rowCount: number = 0
  colCount: number = 0
  map: Block[][] = []
  rollLocations: Record<string, true> = {}

  constructor(day?: number) {
    super(day)
    // build the map skeleton
    this.rowCount = this.input.length
    this.colCount = this.input[0].split("").length
    for (let i = 0; i < this.rowCount; i++) {
      this.map.push(
        new Array(this.colCount).fill({}).map(_ => ({ isRoll: false, rollsAdjacent: 0 })),
      )
    }
  }

  buildMap() {
    // now read the input and populate it
    this.input.forEach((row, rowIndex) => {
      row.split("").forEach((symbol, colIndex) => {
        if (symbol == "@") {
          this.rollLocations[`${rowIndex}:${colIndex}`] = true // put location in object for lookup
          this.map[rowIndex][colIndex].isRoll = true
          this.incrementAdjacent(rowIndex, colIndex, 1)
        }
      })
    })
    this.debugOut(this.map)
  }

  incrementAdjacent(rowIndex: number, colIndex: number, by: 1 | -1) {
    if (rowIndex > 0) {
      if (colIndex > 0) this.map[rowIndex - 1][colIndex - 1].rollsAdjacent += by
      this.map[rowIndex - 1][colIndex].rollsAdjacent += by
      if (colIndex < this.colCount - 1) this.map[rowIndex - 1][colIndex + 1].rollsAdjacent += by
    }
    if (colIndex > 0) this.map[rowIndex][colIndex - 1].rollsAdjacent += by
    if (colIndex < this.colCount - 1) this.map[rowIndex][colIndex + 1].rollsAdjacent += by
    if (rowIndex < this.rowCount - 1) {
      if (colIndex > 0) this.map[rowIndex + 1][colIndex - 1].rollsAdjacent += by
      this.map[rowIndex + 1][colIndex].rollsAdjacent += by
      if (colIndex < this.colCount - 1) this.map[rowIndex + 1][colIndex + 1].rollsAdjacent += by
    }
  }

  pt1() {
    for (const roll in this.rollLocations) {
      const rollCoords = roll.split(":").map(el => parseInt(el))
      if (this.map[rollCoords[0]][rollCoords[1]].rollsAdjacent < 4)
        this.ans.pt1 = <number>this.ans.pt1 + 1
    }
  }
  pt2() {
    const rollCountStart = Object.keys(this.rollLocations).length
    let removedThisIteration = 1 // start true
    while (removedThisIteration > 0) {
      removedThisIteration = 0
      for (const rollCoords in this.rollLocations) {
        const [rowIndex, colIndex] = rollCoords.split(":").map(el => parseInt(el))
        const roll = this.map[rowIndex][colIndex]
        if (roll.rollsAdjacent < 4) {
          roll.isRoll = false // remove this role from map
          delete this.rollLocations[rollCoords] // remove this role from locations object
          this.incrementAdjacent(rowIndex, colIndex, -1) // no longer adjacent
          removedThisIteration++
        }
      }
      this.debugOut(`removed this iteration ${removedThisIteration}`)
    }
    this.ans.pt2 = rollCountStart - Object.keys(this.rollLocations).length
  }
}

// TODO - Don't actually need isRoll. map -> adjacency map

const puzzle = new Puzzle()
puzzle.buildMap()
puzzle.pt1()
puzzle.pt2()
puzzle.answer()

//Pt 1 : Got 1411
//Pt 2 : Got 8557
