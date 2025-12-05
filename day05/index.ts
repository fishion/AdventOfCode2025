import PuzzleBase, { type answerObject } from "../lib/puzzle-base.ts"

class Puzzle extends PuzzleBase {
  testAns: answerObject = { pt1: 3, pt2: 1 }
  ranges: number[][] = []
  ingredients: number[] = []

  constructor(day?: number) {
    super(day)

    this.input.forEach(line => {
      if (line.match(/-/)) this.ranges.push(line.split("-").map(part => parseInt(part)))
      if (line.match(/^\d+$/)) this.ingredients.push(parseInt(line))
    })

    this.debugOut(this.ranges)
    this.debugOut(this.ingredients)
  }

  pt1() {
    this.ingredients.forEach(item => {
      for (let rIndex = 0; rIndex < this.ranges.length; rIndex++) {
        if (item >= this.ranges[rIndex][0] && item <= this.ranges[rIndex][1]) {
          this.debugOut(
            `${item} is in range ${this.ranges[rIndex][0]} to ${this.ranges[rIndex][1]}`,
          )
          this.ans.pt1 = <number>this.ans.pt1 + 1
          break // only count once
        }
      }
    })
  }
  pt2() {}
}

const puzzle = new Puzzle()
puzzle.pt1()
puzzle.pt2()
puzzle.answer()
