import PuzzleBase, { type answerObject } from "../lib/puzzle-base.ts"

interface Cell {
  char: string
  isStart: boolean
  isEmpty: boolean
  isSplitter: boolean
  hasBeam?: boolean
}

class Puzzle extends PuzzleBase {
  testAns: answerObject = { pt1: 21, pt2: 1 }
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
        })
      })
    })
    this.drawMap()
  }

  drawMap() {
    this.manifold.forEach(row => {
      this.debugOut(row.map(el => el.char).join(""))
    })
  }

  pt1() {
    this.debugOut(`running pt1`)
    for (let i = 1; i < this.manifold.length; i++) {
      this.manifold[i].forEach((cell, cIndex) => {
        if (this.manifold[i - 1][cIndex].hasBeam) {
          if (cell.isEmpty) cell.hasBeam = true
          if (cell.isSplitter) {
            this.manifold[i][cIndex - 1].hasBeam = true
            this.manifold[i][cIndex + 1].hasBeam = true
            this.ans.pt1 = <number>this.ans.pt1 + 1
          }
        }
      })
    }
  }
  pt2() {
    this.debugOut(`running pt2`)
  }
}

const puzzle = new Puzzle()
puzzle.run()
