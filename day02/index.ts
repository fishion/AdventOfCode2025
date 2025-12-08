import PuzzleBase, { type answerObject } from "../lib/puzzle-base.ts"

interface Range {
  start: number
  end: number
}

class Puzzle extends PuzzleBase {
  testAns: answerObject = { pt1: 1227775554, pt2: 4174379265 }
  ranges: Range[] = []

  constructor(day?: number) {
    super(day)
    const inputStr = this.input.join("")
    this.ranges = inputStr.split(",").map((el: string) => {
      const [start, end] = el.split("-").map((val: string) => {
        return parseInt(val)
      })
      return {
        start,
        end,
      }
    })
    this.debugOut(this.ranges)
  }

  pt1() {
    this.ranges.forEach(range => {
      for (let i = range.start; i <= range.end; i++) {
        if (/^(.*)\1$/.exec(`${i}`) != null) {
          this.debugOut(`Found a repeating double pattern in ${i}`)
          this.ans.pt1 = <number>this.ans.pt1 + i
        }
        if (/^(.*)\1+$/.exec(`${i}`) != null) {
          this.debugOut(`Found a repeating multi pattern in ${i}`)
          this.ans.pt2 = <number>this.ans.pt2 + i
        }
      }
    })
  }
  pt2() {
    /* all done in part1 */
  }
}

const puzzle = new Puzzle()
puzzle.run()
