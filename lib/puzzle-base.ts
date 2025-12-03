import * as fs from "fs"
import * as path from "path"

export interface answerObject {
  pt1: number | bigint | string
  pt2: number | bigint | string
}

export default class PuzzleBase {
  isTest: boolean
  debug: boolean
  input: string[]
  ans: answerObject = { pt1: 0, pt2: 0 }
  testAns: answerObject = { pt1: 0, pt2: 0 }

  constructor(day?: number) {
    this.isTest = process.argv[2] == "test" || process.argv[3] == "test"
    this.debug = process.argv[2] == "debug" || process.argv[3] == "debug"
    const daydir = day ? `day${day}` : path.basename(path.dirname(process.argv[1] || ""))
    const inputFile = path.join(daydir, `input${this.isTest ? "-test" : ""}`)
    this.input = fs.readFileSync(inputFile, "utf8").split("\n")
  }

  debugOut(debugstr: unknown) {
    if (this.debug) console.log(debugstr)
  }

  answer() {
    const pt1Result =
      this.ans.pt1 == this.testAns.pt1 ? ", Correct" : `, expected '${this.testAns.pt1}'`
    const pt2Result =
      this.ans.pt2 == this.testAns.pt2 ? ", Correct" : `, expected '${this.testAns.pt2}'`
    console.log(`Pt 1 : Got ${this.ans.pt1} ${this.isTest ? pt1Result : ""}`)
    console.log(`Pt 2 : Got ${this.ans.pt2} ${this.isTest ? pt2Result : ""}`)
  }
}
