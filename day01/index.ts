import PuzzleBase, { type answerObject } from "../lib/puzzle-base.ts"

interface Instruction {
  dir: string
  qty: number
}

class Puzzle extends PuzzleBase {
  testAns: answerObject = { pt1: 3, pt2: 6 }
  position: number = 50
  instructions: Instruction[] = []

  constructor(day?: number) {
    super(day)

    this.input.forEach((instruction: string) => {
      const inst: Instruction = {
        dir: instruction.slice(0, 1),
        qty: parseInt(instruction.slice(1)),
      }
      this.instructions.push(inst)
      this.debugOut(`instruction is to turn dial ${inst.qty} places to the ${inst.dir}`)
    })
  }

  reset() {
    this.position = 50
  }

  turnDial(dir: string, qty: number) {
    if (dir == "L") {
      this.position = this.position - qty
    } else if (dir == "R") {
      this.position = this.position + qty
    } else {
      throw Error(`Direction of ${dir} is a problem`)
    }
    this.debugOut(`Current position is ${this.position}`)
  }

  pt1() {
    this.reset()
    this.instructions.forEach((inst: Instruction) => {
      this.turnDial(inst.dir, inst.qty)
      this.position = (this.position + 100) % 100
      if (this.position == 0) this.ans.pt1 = <number>this.ans.pt1 + 1
    })
  }
  pt2() {
    this.reset()
    this.instructions.forEach((inst: Instruction) => {
      const startPos: number = this.position
      // if turning more than 100 we're getting more than one click through 0
      this.ans.pt2 = <number>this.ans.pt2 + Math.floor(inst.qty / 100)
      // now just turn dial modulo 100 clicks
      this.turnDial(inst.dir, inst.qty % 100)
      // Did we click through or on to zero (we didn't if we started on zero though).
      if (startPos != 0 && (this.position <= 0 || this.position >= 100))
        this.ans.pt2 = <number>this.ans.pt2 + 1
      // normalise number to within range
      this.position = (this.position + 100) % 100
    })
  }
}

const puzzle = new Puzzle()
puzzle.run()
