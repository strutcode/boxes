import Game from '../Game'
import Behavior from './Behavior'
import Entity from '../entities/Entity'
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

    const { size } = options
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

    this.body = Game.physics.createBox(vecSize, options.fixed)
  }

  public onCreate(entity: Entity): void {
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
