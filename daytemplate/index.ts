import PuzzleBase, { type answerObject } from "../lib/puzzle-base.ts"

class Puzzle extends PuzzleBase {
  testAns: answerObject = { pt1: 1, pt2: 1 }

  constructor(day?: number) {
    super(day)
  }

  preProcess() {}
  pt1() {}
  pt2() {}
}

const puzzle = new Puzzle()
puzzle.preProcess()
puzzle.pt1()
puzzle.pt2()
puzzle.answer()
