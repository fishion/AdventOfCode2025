import PuzzleBase, { type answerObject } from "../lib/puzzle-base.ts"

class Puzzle extends PuzzleBase {
  testAns: answerObject = { pt1: 3, pt2: 14 }
  ranges: number[][] = []
  ingredients: number[] = []

  constructor(day?: number) {
    super(day)

    this.input.forEach(line => {
      if (line.match(/-/)) this.ranges.push(line.split("-").map(part => parseInt(part)))
      if (line.match(/^\d+$/)) this.ingredients.push(parseInt(line))
    })
    this.uniquifyRanges()
  }

  uniquifyRanges() {
    // ranges overlap with each other. Make a set of unique non-overlapping ranges
    let i = this.ranges.length
    this.debugOut(`number of ranges before merging ${i}`)
    while (--i) {
      // For each range (except the last one, where there'd be nothing to merge with)
      const iLow = this.ranges[i][0]
      const iHigh = this.ranges[i][1]
      let hasBeenMerged = false
      let j = i
      while (j--) {
        // loop over each range before this in list.
        // If they overlap merge this range into that one and delete this range
        // Fine to merge same range multiple times. Everything will collapse down eventually
        const jLow = this.ranges[j][0]
        const jHigh = this.ranges[j][1]
        if (
          (jLow <= iLow && iLow <= jHigh) ||
          (jLow <= iHigh && iHigh <= jHigh) ||
          (iLow <= jLow && jLow <= iHigh) ||
          (iLow <= jHigh && jHigh <= iHigh)
        ) {
          this.ranges[j][0] = jLow < iLow ? jLow : iLow
          this.ranges[j][1] = jHigh > iHigh ? jHigh : iHigh
          hasBeenMerged = true
        }
      }
      if (hasBeenMerged) this.ranges.splice(i, 1)
    }
    this.debugOut(`number of ranges after merging ${this.ranges.length}`)
    this.debugOut(this.ranges.sort((a, b) => a[0] - b[0]))
  }

  pt1() {
    this.ingredients.forEach(item => {
      for (let rIndex = 0; rIndex < this.ranges.length; rIndex++) {
        if (item >= this.ranges[rIndex][0] && item <= this.ranges[rIndex][1]) {
          this.ans.pt1 = <number>this.ans.pt1 + 1
          break // only count once
        }
      }
    })
  }
  pt2() {
    this.ranges.forEach(range => {
      this.ans.pt2 = <number>this.ans.pt2 + (range[1] - range[0]) + 1
    })
  }
}

const puzzle = new Puzzle()
puzzle.run()
