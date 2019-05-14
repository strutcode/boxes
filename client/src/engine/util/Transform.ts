import Vector from './Vector'

export default class Transform {
  public x: number = 0
  public y: number = 0
  public r: number = 0

  public constructor(x?: number, y?: number, r?: number) {
    this.x = x || 0
    this.y = y || 0
    this.r = r || 0
  }

  public translate(delta: Vector): void {
    this.x += delta.x
    this.y += delta.y
  }
}
