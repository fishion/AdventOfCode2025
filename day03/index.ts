import PuzzleBase, {type answerObject } from "../lib/puzzle-base.ts"

class Puzzle extends PuzzleBase {
  testAns: answerObject = {pt1 : 357, pt2 : 3121910778619}

  constructor(day?:number) {
    super(day)
  }

  pt1(){
    this.input.forEach((bank: string) => {
      let d1 = -1
      let d2 = -1
      const jolts: number[] = bank.split('').map((jolt: string) => parseInt(jolt))
      for (let i=0; i<jolts.length; i++) { // could maybe be more efficient going backwards?
        if (i<jolts.length-1 && jolts[i] > d1){
          d1 = jolts[i]
          d2 = jolts[i+1]
        } else if (jolts[i] > d2){
          d2 = jolts[i]
        }
      }
      if (d1 < 0 || d2 < 0){ throw Error(`Didn't find a d1 or d2 : ${d1} : ${d2}`) }
      this.debugOut(`joltage = ${d1}${d2}`)
      this.ans.pt1 = <number>this.ans.pt1 + parseInt(`${d1}${d2}`)
    })
  }
  pt2(){

  }

}

const puzzle = new Puzzle()
puzzle.pt1()
puzzle.pt2()
puzzle.answer()