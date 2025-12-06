import PuzzleBase, { type answerObject } from "../lib/puzzle-base.ts"

interface Sum {
  operator: string
  numbers: number[]
}

class Puzzle extends PuzzleBase {
  testAns: answerObject = { pt1: 4277556, pt2: 3263827 }

  constructor(day?: number) {
    super(day)
  }

  doSums(sums: Sum[]) {
    let total = 0
    sums.forEach(sum => {
      total += eval(sum.numbers.join(sum.operator))
    })
    return total
  }

  pt1() {
    // prefill a sums array
    const numberOfSums = this.input[this.input.length - 1].replace(/\s/g, "").length
    const sums: Sum[] = new Array(numberOfSums)
      .fill(undefined)
      .map(_ => ({ operator: ".", numbers: [] }))
    // build the sums
    this.input.forEach((line, lIndex) => {
      const rowData: string[] = line.replace(/^\s*(.*?)\s*$/, "$1").split(/\s+/)
      if (lIndex == this.input.length - 1) {
        rowData.forEach((el, i) => (sums[i].operator = el))
      } else {
        rowData.forEach((el, i) => sums[i].numbers.push(parseInt(el)))
      }
    })
    this.debugOut(sums)
    this.ans.pt1 = this.doSums(sums)
  }

  pt2() {
    // Plan : rotate the whole puzzle anticlockwise
    const rotated: string[][] = new Array(this.input[0].length).fill(undefined).map(_ => [])
    this.input.forEach(line => {
      const chars = line.split("").reverse()
      chars.forEach((char, cIndex) => rotated[cIndex].push(char))
    })
    this.debugOut(rotated)
    // Reread rotated and build sum
    const sums: Sum[] = []
    let numberBuffer: number[] = []
    rotated.forEach(newLine => {
      const operator = newLine.pop()
      const numberStr = newLine.join("").replace(/\s+/g, "")
      if (numberStr.length) numberBuffer.push(parseInt(numberStr))
      if (operator == "+" || operator == "*") {
        sums.push({ operator: operator, numbers: numberBuffer })
        numberBuffer = [] // reset
      }
    })
    this.debugOut(sums)
    this.ans.pt2 = this.doSums(sums)
  }
}

const puzzle = new Puzzle()
puzzle.run()
