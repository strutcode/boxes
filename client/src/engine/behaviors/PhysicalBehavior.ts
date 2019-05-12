import Behavior from './Behavior'
import Physics from '../physics/Physics'
import Entity from '../Entity'
import Vector from '../util/Vector'
import PhysicsBody from '../physics/PhysicsBody'

interface PhysicalBehaviorOptions {
  size?: number | Vector
  fixed?: boolean
}

export default class PhysicalBehavior extends Behavior {
  public body: PhysicsBody

  public constructor(options: PhysicalBehaviorOptions = {}) {
    super('physics')

    let { size } = options
    if (typeof size === 'number') {
      size = new Vector(size, size)
    }
    if (typeof size === 'undefined') {
      size = new Vector(1, 1)
    }

    this.body = Physics.createBox(size, options.fixed)
  }

  public onCreate(entity: Entity): void {
    this.body.setTransform(entity.transform)
  }

  public onUpdate(entity: Entity): void {
    const { transform } = this.body

    entity.transform.x = transform.x
    entity.transform.y = transform.y
    entity.transform.r = transform.r
  }

  public addForce(amount: Vector): void {
    this.body.addForce(amount)
  }
}
