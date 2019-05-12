import Behavior from './Behavior'
import Entity from '../Entity'
import Vector from '../util/Vector'
import PhysicsBody from '../physics/PhysicsBody'

interface PhysicalBehaviorOptions {
  size?: number | Vector
  fixed?: boolean
}

export default class PhysicalBehavior extends Behavior {
  public body: PhysicsBody | undefined
  public options: PhysicalBehaviorOptions

  public constructor(options: PhysicalBehaviorOptions = {}) {
    super('physics')

    this.options = options
  }

  public onCreate(entity: Entity): void {
    const { size } = this.options
    let vecSize: Vector

    if (size instanceof Vector) {
      vecSize = size
    }
    else if (typeof size === 'number') {
      vecSize = new Vector(size, size)
    }
    else {
      vecSize = new Vector(1, 1)
    }

    this.body = entity.game.physics.createBox(vecSize, this.options.fixed)
    this.body.setTransform(entity.transform)
  }

  public onUpdate(entity: Entity): void {
    const { transform } = this.body as PhysicsBody

    entity.transform.x = transform.x
    entity.transform.y = transform.y
    entity.transform.r = transform.r
  }

  public addForce(amount: Vector): void {
    (this.body as PhysicsBody).addForce(amount)
  }
}
