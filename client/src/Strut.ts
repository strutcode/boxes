import Entity from './engine/Entity'
import Vector from './engine/Vector'
import PhysicsComponent from './engine/PhysicsComponent'
import SpriteComponent from './engine/SpriteComponent'

export default class Strut {
  public constructor(start: Vector, end: Vector) {
    const dist = end.subtract(start).length()
    const size = new Vector(0.5, dist)

    new Entity([
      new SpriteComponent({ size }),
      new PhysicsComponent({ size }),
    ])
  }
}
