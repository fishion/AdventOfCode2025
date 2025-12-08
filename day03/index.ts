import PuzzleBase, { type answerObject } from "../lib/puzzle-base.ts"

class Puzzle extends PuzzleBase {
  testAns: answerObject = { pt1: 357, pt2: 3121910778619 }

  constructor(day?: number) {
    super(day)
  }

  bankJoltage(bank: string, qtyBatteriesEnabled: number = 2) {
    const output = new Array(qtyBatteriesEnabled).fill(-1)
    const cells: number[] = bank.split("").map((jolt: string) => parseInt(jolt))
    for (let cIndex = 0; cIndex < cells.length; cIndex++) {
      const cellsLeft = cells.length - cIndex
      // loop through output digits and see what should be updated
      for (let oIndex = 0; oIndex <= qtyBatteriesEnabled; oIndex++) {
        const outputsLeft = output.length - oIndex
        if (cellsLeft < outputsLeft) continue // this cell can't fill this output slot - not enough outputs left
        if (cells[cIndex] > output[oIndex]) {
          output[oIndex] = cells[cIndex] // This is new highest joltage for cell in this position
          output.fill(-1, oIndex + 1) // All following digits will have to change. Reset them to -1
          break // Already applied this cell to an output digit. Move on.
        }
      }
    }
    if (output[0] < 0 || output[1] < 0) {
      throw Error(`Didn't find a d1 or d2 : ${output[0]} : ${output[1]}`)
    }
    return parseInt(output.join(""))
  }

  totalJoltage(qtyBatteriesEnabled: number = 2) {
    let total = 0
    this.input.forEach((bank: string) => {
      const joltage = this.bankJoltage(bank, qtyBatteriesEnabled)
      this.debugOut(`joltage for bank ${bank} = ${joltage}`)
      total += joltage
    })
    return total
  }

  pt1() {
    this.ans.pt1 = this.totalJoltage(2)
  }
  pt2() {
    this.ans.pt2 = this.totalJoltage(12)
  }
}

const puzzle = new Puzzle()
puzzle.run()
