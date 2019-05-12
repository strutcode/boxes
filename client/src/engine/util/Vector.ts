// import { Vector2 as Vector } from 'babylonjs'

export default class Vector {
  public x: number = 0
  public y: number = 0

  public constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  public distanceTo(other: Vector): number {
    return Math.sqrt((this.x + other.x) ** 2) + ((this.y + other.y) ** 2)
  }
}
