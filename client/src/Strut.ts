import Entity from './engine/Entity'
import Vector from './engine/util/Vector'
import PhysicalBehavior from './engine/behaviors/PhysicalBehavior'
import VisualBehavior from './engine/behaviors/VisualBehavior'

export default class Strut extends Entity {
  public constructor(start: Vector, end: Vector) {
    const dist = start.distanceTo(end)
    const size = new Vector(0.5, dist)

    super({
      behavior: [
        new VisualBehavior({ size }),
        new PhysicalBehavior({ size }),
      ],
    })
  }
}
