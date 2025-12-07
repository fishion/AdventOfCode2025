import PuzzleBase, { type answerObject } from "../lib/puzzle-base.ts"

interface Cell {
  char: string
  isStart: boolean
  isEmpty: boolean
  isSplitter: boolean
  hasBeam?: boolean
  beamCount: number
}

class Puzzle extends PuzzleBase {
  testAns: answerObject = { pt1: 21, pt2: 40 }
  manifold: Cell[][] = []

  constructor(day?: number) {
    super(day)
    // build the manifold
    this.input.forEach((row, rIndex) => {
      this.manifold.push([])
      row.split("").forEach(char => {
        this.manifold[rIndex].push({
          char,
          isStart: char == "S",
          isEmpty: char == ".",
          isSplitter: char == "^",
          hasBeam: char == "S",
          beamCount: char == "S" ? 1 : 0,
        })
      })
    })
    this.drawMap()
  }

  drawMap() {
    this.manifold.forEach(row => {
      this.debugOut(row.map(el => el.beamCount || el.char).join(""))
    })
  }

  pt1() {
    this.debugOut(`running pt1`)
    for (let i = 1; i < this.manifold.length; i++) {
      this.manifold[i].forEach((cell, cIndex) => {
        if (this.manifold[i - 1][cIndex].hasBeam) {
          const carriedBeams = this.manifold[i - 1][cIndex].beamCount
          if (cell.isEmpty) {
            cell.hasBeam = true
            cell.beamCount += carriedBeams
          }
          if (cell.isSplitter) {
            this.manifold[i][cIndex - 1].hasBeam = true
            this.manifold[i][cIndex - 1].beamCount += carriedBeams
            this.manifold[i][cIndex + 1].hasBeam = true
            this.manifold[i][cIndex + 1].beamCount += carriedBeams
            this.ans.pt1 = <number>this.ans.pt1 + 1
          }
        }
      })
    }
  }
  pt2() {
    this.debugOut(`running pt2`)
    // should just be able to count total summed beamcount on bottom row
    this.drawMap()
    this.manifold[this.manifold.length - 1].forEach(cell => {
      this.ans.pt2 = <number>this.ans.pt2 + cell.beamCount
    })
  }
}

const puzzle = new Puzzle()
puzzle.run()
