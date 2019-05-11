import Component from './Component'
import Physics, { PhysicsBody } from './Physics'
import Entity from './Entity'
import Vector from './Vector'

interface PhysicsJointOptions {
  size?: number | Vector
  fixed?: boolean
}

export default class PhysicsComponent extends Component {
  public body: PhysicsBody

  public constructor(options: PhysicsJointOptions = {}) {
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
