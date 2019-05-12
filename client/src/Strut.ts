import Game from './engine/Game'
import Vector from './engine/util/Vector'
import PhysicalBehavior from './engine/behaviors/PhysicalBehavior'
import VisualBehavior from './engine/behaviors/VisualBehavior'

export default class Strut {
  public constructor(start: Vector, end: Vector) {
    const dist = start.distanceTo(end)
    const size = new Vector(0.5, dist)

    Game.createEntity({
      behavior: [
        new VisualBehavior({ size }),
        new PhysicalBehavior({ size }),
      ],
    })
  }
}
