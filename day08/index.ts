import PuzzleBase, { type answerObject } from "../lib/puzzle-base.ts"

interface Pair {
  distance: number
  ids: [number, number]
}

class Puzzle extends PuzzleBase {
  testAns: answerObject = { pt1: 40, pt2: 25272 }
  boxes: number[][] = []
  boxesUsed: Record<string, boolean> = {}
  distances: Pair[] = []
  circuits: Record<string, string>[] = []

  constructor(day?: number) {
    super(day)

    // build simple list of 3d coords
    this.boxes = this.input.map(line => line.split(",").map(coord => parseInt(coord)))

    // build list of junction box pairs with distances
    let boxID = this.boxes.length
    while (boxID--) {
      let pairID = boxID
      while (pairID--) {
        this.distances.push({ ids: [boxID, pairID], distance: this.distance(boxID, pairID) })
      }
    }
    this.distances = this.distances.sort((a, b) => a.distance - b.distance)
    //this.debugOut(this.distances)
  }

  distance(id1: number, id2: number) {
    const b1 = this.boxes[id1]
    const b2 = this.boxes[id2]
    return Math.sqrt((b1[0] - b2[0]) ** 2 + (b1[1] - b2[1]) ** 2 + (b1[2] - b2[2]) ** 2)
  }

  wirePair(pair: Pair) {
    const joinCircuits: number[] = []
    this.circuits.forEach((circuit, cIndex) => {
      if (circuit[`${pair.ids[0]}`] || circuit[`${pair.ids[1]}`]) joinCircuits.push(cIndex)
    })
    if (joinCircuits.length == 0) {
      // create new circuit
      this.circuits.push({
        [pair.ids[0]]: this.boxes[pair.ids[0]].join(","),
        [pair.ids[1]]: this.boxes[pair.ids[1]].join(","),
      })
    } else if (joinCircuits.length == 1) {
      this.circuits[joinCircuits[0]][`${pair.ids[0]}`] = this.boxes[pair.ids[0]].join(",")
      this.circuits[joinCircuits[0]][`${pair.ids[1]}`] = this.boxes[pair.ids[1]].join(",")
    } else if (joinCircuits.length == 2) {
      // circuit connected two existing circuits so merge a couple of lists
      this.circuits[joinCircuits[0]] = {
        ...this.circuits[joinCircuits[0]],
        ...this.circuits[joinCircuits[1]],
      }
      this.circuits.splice(joinCircuits[1], 1)
    }
    this.boxesUsed[`${pair.ids[0]}`] = true
    this.boxesUsed[`${pair.ids[1]}`] = true
  }

  allBoxesUsed() {
    return Object.keys(this.boxesUsed).length == this.boxes.length
  }

  pt1() {
    this.debugOut(`running pt1`)
    // get top X shorteest distances
    const topX = this.distances.slice(0, this.isTest ? 10 : 1000)
    // map these shortest distances to uniue circuits
    topX.forEach(pair => {
      this.wirePair(pair)
    })
    this.debugOut(this.circuits)
    this.ans.pt1 = 1
    this.circuits
      .sort((a, b) => Object.keys(b).length - Object.keys(a).length)
      .slice(0, 3)
      .forEach(circuit => (this.ans.pt1 = <number>this.ans.pt1 * Object.keys(circuit).length))
  }
  pt2() {
    this.debugOut(`running pt2`)
    // carry on where we left off - no need to repeat work
    const remainingDistances = this.distances.slice(this.isTest ? 10 : 1000)
    let distanceIndex = -1
    while (!this.allBoxesUsed()) {
      this.wirePair(remainingDistances[++distanceIndex])
    }
    const lastCords = remainingDistances[distanceIndex].ids.map(id => this.boxes[id])
    this.debugOut(`last pair is boxes ${lastCords[0].join(",")} and ${lastCords[1].join(",")}`)
    this.ans.pt2 = lastCords[0][0] * lastCords[1][0]
  }
}

const puzzle = new Puzzle()
puzzle.run()
