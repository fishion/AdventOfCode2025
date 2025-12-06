import * as fs from "fs"
import * as path from "path"

const FgRed = "\x1b[31m"
const FgGreen = "\x1b[32m"
const ColReset = "\x1b[0m"

export interface answerObject {
  pt1: number | bigint | string
  pt2: number | bigint | string
}

export default abstract class PuzzleBase {
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

  run() {
    this.pt1()
    this.pt2()
    this.answer()
  }

  abstract pt1(): void
  abstract pt2(): void

  answer() {
    ;[1, 2].forEach(partNo => {
      const ptKey = `pt${partNo}` as keyof answerObject
      let outStr = `Pt ${partNo} result = ${this.ans[ptKey]}`
      if (this.isTest) {
        outStr +=
          this.ans[ptKey] == this.testAns[ptKey]
            ? ` : ${FgGreen}Correct`
            : ` : ${FgRed}Expected '${this.testAns[ptKey]}'`
        outStr += ColReset
      }
      console.log(outStr)
    })
  }
}
