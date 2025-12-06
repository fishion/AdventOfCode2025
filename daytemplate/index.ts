import PuzzleBase, { type answerObject } from "../lib/puzzle-base.ts"

class Puzzle extends PuzzleBase {
  testAns: answerObject = { pt1: 1, pt2: 1 }

  constructor(day?: number) {
    super(day)
  }

  pt1() {
    this.debugOut(`running pt1`)
  }
  pt2() {
    this.debugOut(`running pt2`)
  }
}

const puzzle = new Puzzle()
puzzle.run()
